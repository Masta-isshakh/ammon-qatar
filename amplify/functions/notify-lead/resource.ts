import { defineFunction } from '@aws-amplify/backend';

/**
 * Fires on every new BookingInquiry row (DynamoDB stream INSERT) and emails
 * the operations inbox via Amazon SES. Wired to the stream in amplify/backend.ts.
 */
export const notifyLead = defineFunction({
  name: 'notify-lead',
  entry: './handler.ts',
  /*
   * Place the function in the data stack. Its DynamoDB stream trigger is
   * created alongside the Lead table (see amplify/backend.ts), so keeping the
   * function in its own stack makes the data stack depend on the function
   * stack and CloudFormation rejects the deployment with
   * "circular dependency found between nested stacks [data, function]".
   */
  resourceGroupName: 'data',
  runtime: 20,
  timeoutSeconds: 30,
  memoryMB: 256,
  environment: {
    NOTIFY_FROM_EMAIL: process.env.NOTIFY_FROM_EMAIL ?? 'leads@ammonqatar.com',
    NOTIFY_TO_EMAIL: process.env.NOTIFY_TO_EMAIL ?? 'operations@ammonqatar.com',
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ammonqatar.com',
  },
});
