import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadPlayfair(): Promise<ArrayBuffer | null> {
  try {
    // Request TTF via an older UA — Google Fonts returns TTF for older browsers,
    // which is required by satori (woff2 is not supported).
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700',
      { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1)' } },
    ).then((r) => r.text())

    const url = css.match(/url\(([^)]+)\)/)?.[1]
    if (!url) return null

    return fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function OgImage() {
  const fontData = await loadPlayfair()

  const fonts = fontData
    ? [{ name: 'Playfair Display', data: fontData, style: 'normal' as const, weight: 700 as const }]
    : []

  const headlineFont = fontData ? 'Playfair Display' : 'serif'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '72px 88px',
        }}
      >
        {/* Left vertical accent */}
        <div
          style={{
            position: 'absolute',
            left: '88px',
            top: '72px',
            width: '1px',
            height: '486px',
            background: 'linear-gradient(to bottom, #c9a84c 0%, transparent 100%)',
            opacity: 0.35,
          }}
        />

        {/* Top-right corner lines */}
        <div
          style={{
            position: 'absolute',
            top: '72px',
            right: '88px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '6px',
          }}
        >
          <div style={{ width: '48px', height: '2px', background: '#c9a84c', opacity: 0.6 }} />
          <div style={{ width: '24px', height: '1px', background: '#c9a84c', opacity: 0.35 }} />
        </div>

        {/* Main layout — offset right of the vertical line */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingLeft: '52px',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Role label */}
          <div
            style={{
              color: '#c9a84c',
              fontSize: '15px',
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              fontFamily: 'sans-serif',
              fontWeight: 400,
            }}
          >
            Music Producer · DJ · Songwriter
          </div>

          {/* Name + divider + tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div
              style={{
                color: '#f0ede8',
                fontSize: '130px',
                fontWeight: 700,
                fontFamily: headlineFont,
                lineHeight: 0.88,
                letterSpacing: '-5px',
              }}
            >
              SpiceKtrl
            </div>

            <div style={{ width: '72px', height: '2px', background: '#c9a84c' }} />

            <div
              style={{
                color: '#555555',
                fontSize: '14px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                fontFamily: 'sans-serif',
                fontWeight: 400,
              }}
            >
              Nigerian-born · Based in the UK · Afrobeats &amp; Afro-electronic
            </div>
          </div>

          {/* Bottom: URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <div
              style={{
                color: '#333333',
                fontSize: '13px',
                letterSpacing: '0.22em',
                fontFamily: 'sans-serif',
              }}
            >
              spicektrl.com
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  )
}
