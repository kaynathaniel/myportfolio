import { ImageResponse } from 'next/og'

// 192x192 PNG favicon — Google prefers raster favicons at multiples of 48px.
// Coexists with icon.svg (vector) so crawlers can pick whichever they prefer.
export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon() {
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
              fontSize: 92,
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
              width: 40,
              height: 2,
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
