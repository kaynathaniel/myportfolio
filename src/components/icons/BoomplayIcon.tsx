import type { SVGProps } from 'react'

interface Props extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number | string
}

export default function BoomplayIcon({ size = 16, ...props }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Boomplay</title>
      <path d="M3 0a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3zm5 5h5.75a3.5 3.5 0 0 1 2.3 6 3.5 3.5 0 0 1-2.3 6H8V5zm2.5 2.4v3.2h3.1a1.6 1.6 0 0 0 0-3.2h-3.1zm0 5.6v3.2h3.25a1.6 1.6 0 0 0 0-3.2H10.5z" />
    </svg>
  )
}
