interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/** JSON-LD script; "<" is escaped so content strings can never break out of the tag. */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\u003c') }}
    />
  );
}
