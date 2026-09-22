import type { DynamoDBStreamHandler, DynamoDBRecord } from 'aws-lambda';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import type { AttributeValue } from '@aws-sdk/client-dynamodb';

const ses = new SESClient({});

const FROM = process.env.NOTIFY_FROM_EMAIL ?? '';
const TO = (process.env.NOTIFY_TO_EMAIL ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const SITE_URL = process.env.SITE_URL ?? 'https://ammonqatar.com';

interface LeadRow {
  id: string;
  reference: string;
  locale?: string;
  name: string;
  companyType: string;
  companyName?: string;
  phone: string;
  email: string;
  debtCategory: string;
  amountRange: string;
  debtAge: string;
  preferredContact: string;
  message?: string;
  sourcePage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  submittedAt?: string;
}

const HTML_ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);

function toLead(record: DynamoDBRecord): LeadRow | null {
  const image = record.dynamodb?.NewImage;
  if (!image) return null;
  return unmarshall(image as Record<string, AttributeValue>) as LeadRow;
}

function buildEmail(row: LeadRow) {
  const digits = row.phone.replace(/\D/g, '');
  const waLink = `https://wa.me/${digits}`;
  const fields: Array<[string, string]> = [
    ['Reference', row.reference],
    ['Name', row.name],
    ['Type', row.companyType + (row.companyName ? ` — ${row.companyName}` : '')],
    ['Phone', row.phone],
    ['Email', row.email],
    ['Preferred contact', row.preferredContact],
    ['Receivable type', row.debtCategory],
    ['Amount range', row.amountRange],
    ['Age of debt', row.debtAge],
    ['Message', row.message ?? '—'],
    ['Language', row.locale ?? '—'],
    ['Source page', row.sourcePage ?? '—'],
    ['UTM', [row.utmSource, row.utmMedium, row.utmCampaign].filter(Boolean).join(' / ') || '—'],
    ['Submitted', row.submittedAt ?? new Date().toISOString()],
  ];

  const subject = `New case assessment request ${row.reference} — ${row.debtCategory} (${row.amountRange})`;
  const text = fields.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nWhatsApp: ${waLink}`;
  const rows = fields
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5a6478;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>` +
        `<td style="padding:6px 12px;font-size:14px;color:#10182a">${escapeHtml(String(v))}</td></tr>`,
    )
    .join('');
  const html =
    `<!doctype html><html><body style="margin:0;background:#f9f8f5;font-family:Manrope,Arial,sans-serif">` +
    `<div style="max-width:560px;margin:24px auto;background:#fff;border:1px solid #dfe3ea;border-radius:12px;overflow:hidden">` +
    `<div style="background:#001c55;padding:20px 24px;border-bottom:3px solid #b8862b">` +
    `<h1 style="margin:0;font-size:18px;color:#d3a852">Ammon Qatar — New case assessment request</h1></div>` +
    `<table style="border-collapse:collapse;width:100%;margin:12px 0">${rows}</table>` +
    `<div style="padding:16px 24px 24px">` +
    `<a href="${waLink}" style="display:inline-block;background:#001c55;color:#fff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:999px">Open WhatsApp</a>` +
    `<p style="color:#5a6478;font-size:12px;margin-top:16px">Sent automatically from ${escapeHtml(SITE_URL)}. Treat this message as confidential.</p>` +
    `</div></div></body></html>`;
  return { subject, text, html };
}

export const handler: DynamoDBStreamHandler = async (event) => {
  if (!FROM || TO.length === 0) {
    console.warn('notify-lead: NOTIFY_FROM_EMAIL / NOTIFY_TO_EMAIL not configured — skipping');
    return { batchItemFailures: [] };
  }
  const failures: { itemIdentifier: string }[] = [];
  for (const record of event.Records) {
    if (record.eventName !== 'INSERT') continue;
    const row = toLead(record);
    if (!row) continue;
    try {
      const { subject, text, html } = buildEmail(row);
      await ses.send(
        new SendEmailCommand({
          Source: FROM,
          Destination: { ToAddresses: TO },
          ReplyToAddresses: row.email ? [row.email] : undefined,
          Message: {
            Subject: { Data: subject, Charset: 'UTF-8' },
            Body: { Text: { Data: text, Charset: 'UTF-8' }, Html: { Data: html, Charset: 'UTF-8' } },
          },
        }),
      );
      console.log(`notify-lead: emailed ${row.reference}`);
    } catch (err) {
      console.error(`notify-lead: failed for ${row.reference}`, err);
      if (record.dynamodb?.SequenceNumber) failures.push({ itemIdentifier: record.dynamodb.SequenceNumber });
    }
  }
  return { batchItemFailures: failures };
};
