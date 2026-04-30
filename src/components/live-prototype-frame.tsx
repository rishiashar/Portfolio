"use client"

import { useEffect, useState } from "react"

type LivePrototypeFrameProps = {
  url: string
  title: string
  className?: string
}

function withCacheBuster(url: string) {
  const separator = url.includes("?") ? "&" : "?"
  return `${url}${separator}portfolioEmbed=${Date.now()}`
}

export function LivePrototypeFrame({
  url,
  title,
  className,
}: LivePrototypeFrameProps) {
  const [src, setSrc] = useState(url)

  useEffect(() => {
    const refresh = () => setSrc(withCacheBuster(url))

    refresh()
    window.addEventListener("pageshow", refresh)

    return () => window.removeEventListener("pageshow", refresh)
  }, [url])

  return (
    <iframe
      key={src}
      src={src}
      title={title}
      className={className}
      loading="eager"
      referrerPolicy="no-referrer"
    />
  )
}
