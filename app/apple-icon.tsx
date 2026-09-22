import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon generated at build time from the shield mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#001c55', borderRadius: 40 }}>
        <svg viewBox="0 0 64 64" width="120" height="120">
          <path d="M32 8 L52 17 V36 C52 47 43 55 32 59 C21 55 12 47 12 36 V17 Z" fill="none" stroke="#b8862b" strokeWidth="2" />
          <path d="M32 20 L41 42 H36.5 L32 30.5 L27.5 42 H23 Z" fill="#d3a852" />
        </svg>
      </div>
    ),
    size,
  );
}
