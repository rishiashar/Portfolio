type NextMarkProps = {
  size?: number
  className?: string
}

export function NextMark({ size = 40, className }: NextMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 40 40"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="3" />
      <path
        d="M13.25 27.5V12.5H16.3L27 27.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.65"
      />
      <path
        d="M26.75 12.5V27.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.65"
      />
    </svg>
  )
}
