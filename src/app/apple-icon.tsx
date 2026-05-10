import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              color: '#c9a84c',
              fontSize: '82px',
              fontWeight: 700,
              fontFamily: 'serif',
              lineHeight: 1,
              letterSpacing: '-4px',
            }}
          >
            SK
          </div>
          <div
            style={{
              width: '36px',
              height: '1px',
              background: '#c9a84c',
              opacity: 0.6,
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  )
}
