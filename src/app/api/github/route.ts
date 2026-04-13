import { NextResponse } from "next/server"

interface GitHubEvent {
  type: string
  repo: { name: string }
  created_at: string
  payload: {
    commits?: { sha: string }[]
    size?: number
    distinct_size?: number
  }
}

interface DayData {
  date: string
  count: number
  repos: Record<string, number>
}

const GITHUB_USERNAME = "rishiashar"
const USER_TIME_ZONE = "America/Toronto"

export const dynamic = "force-dynamic"

function getDatePartsInTimeZone(date: Date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: USER_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return formatter.formatToParts(date).reduce(
    (acc, part) => {
      if (part.type === "year") acc.year = Number(part.value)
      if (part.type === "month") acc.month = Number(part.value)
      if (part.type === "day") acc.day = Number(part.value)
      return acc
    },
    { year: 0, month: 0, day: 0 }
  )
}

function buildLastThirtyDays() {
  const today = getDatePartsInTimeZone(new Date())
  const anchor = new Date(Date.UTC(today.year, today.month - 1, today.day, 12))
  const days: DayData[] = []

  for (let i = 29; i >= 0; i--) {
    const date = new Date(anchor)
    date.setUTCDate(date.getUTCDate() - i)
    days.push({
      date: date.toISOString().slice(0, 10),
      count: 0,
      repos: {},
    })
  }

  return days
}

function parseContributionCount(label: string) {
  if (label.includes("No contributions")) return 0

  const match = label.match(/(\d+)\s+contributions?/)
  return match ? Number(match[1]) : 0
}

async function fetchContributionCounts(dateKeys: Set<string>) {
  const counts = new Map<string, number>()
  const years = new Set([...dateKeys].map((date) => date.slice(0, 4)))

  for (const year of years) {
    const response = await fetch(
      `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`,
      {
        headers: {
          "User-Agent": "rishiashar-portfolio",
        },
        cache: "no-store",
      }
    )

    if (!response.ok) continue

    const html = await response.text()
    const cellPattern =
      /<td[^>]*data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="([^"]+)"[^>]*><\/td>\s*<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g

    for (const match of html.matchAll(cellPattern)) {
      const [, date, id, tooltipFor, label] = match
      if (id !== tooltipFor || !dateKeys.has(date)) continue
      counts.set(date, parseContributionCount(label))
    }
  }

  return counts
}

async function fetchRepoBreakdown(dateKeys: Set<string>) {
  const reposByDate = new Map<string, Record<string, number>>()

  try {
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "rishiashar-portfolio",
          },
          cache: "no-store",
        }
      )

      if (!response.ok) break

      const events: GitHubEvent[] = await response.json()
      if (events.length === 0) break

      for (const event of events) {
        if (event.type !== "PushEvent") continue

        const dateKey = event.created_at.slice(0, 10)
        if (!dateKeys.has(dateKey)) continue

        const commits =
          event.payload.commits?.length ??
          event.payload.distinct_size ??
          event.payload.size ??
          1

        const repoShort = event.repo.name.split("/")[1] ?? event.repo.name
        const dayRepos = reposByDate.get(dateKey) ?? {}
        dayRepos[repoShort] = (dayRepos[repoShort] ?? 0) + commits
        reposByDate.set(dateKey, dayRepos)
      }
    }
  } catch {
    return reposByDate
  }

  return reposByDate
}

export async function GET() {
  try {
    const days = buildLastThirtyDays()
    const dateKeys = new Set(days.map((day) => day.date))

    const [contributionCounts, repoBreakdown] = await Promise.all([
      fetchContributionCounts(dateKeys),
      fetchRepoBreakdown(dateKeys),
    ])

    let total = 0

    for (const day of days) {
      day.count = contributionCounts.get(day.date) ?? 0
      day.repos = day.count > 0 ? repoBreakdown.get(day.date) ?? {} : {}
      total += day.count
    }

    return NextResponse.json({ days, total })
  } catch {
    return NextResponse.json({ days: [], total: 0 }, { status: 500 })
  }
}
