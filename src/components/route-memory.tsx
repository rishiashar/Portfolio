"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import {
  CURRENT_PAGE_STORAGE_KEY,
  PREVIOUS_PAGE_STORAGE_KEY,
} from "@/lib/route-memory"

function getCurrentPage() {
  return `${window.location.pathname}${window.location.search}`
}

export function RouteMemory() {
  const pathname = usePathname()
  const mountedRef = useRef(false)

  useEffect(() => {
    try {
      const currentPage = getCurrentPage()
      const lastPage = sessionStorage.getItem(CURRENT_PAGE_STORAGE_KEY)

      if (mountedRef.current && lastPage && lastPage !== currentPage) {
        sessionStorage.setItem(PREVIOUS_PAGE_STORAGE_KEY, lastPage)
      }

      sessionStorage.setItem(CURRENT_PAGE_STORAGE_KEY, currentPage)
      mountedRef.current = true
    } catch {}
  }, [pathname])

  return null
}
