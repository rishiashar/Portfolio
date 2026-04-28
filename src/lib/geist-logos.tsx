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
      viewBox="0 0 180 180"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="90" cy="90" r="90" fill="currentColor" />
      <path
        d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.879 95.471a90.931 90.931 0 0 0 9.515-7.335Z"
        fill="var(--page-bg)"
      />
      <rect x="115" y="54" width="12" height="72" fill="var(--page-bg)" />
    </svg>
  )
}
