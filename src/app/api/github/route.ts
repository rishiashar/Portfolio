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

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const username = "rishiashar"

    // Fetch multiple pages of events (30 per page, GitHub max)
    const allEvents: GitHubEvent[] = []
    for (let page = 1; page <= 10; page++) {
      const res = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=30&page=${page}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "rishiashar-portfolio",
          },
          cache: "no-store",
        }
      )
      if (!res.ok) break
      const events: GitHubEvent[] = await res.json()
      if (events.length === 0) break
      allEvents.push(...events)
    }

    // Build last 30 days map
    const now = new Date()
    const days: DayData[] = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      days.push({
        date: d.toISOString().split("T")[0],
        count: 0,
        repos: {},
      })
    }

    const dayMap = new Map(days.map((d) => [d.date, d]))

    // Aggregate push events — use size/distinct_size or count each push as 1
    let total = 0
    for (const event of allEvents) {
      if (event.type !== "PushEvent") continue
      const dateKey = event.created_at.split("T")[0]
      const day = dayMap.get(dateKey)
      if (!day) continue
      const commits =
        event.payload.commits?.length ??
        event.payload.distinct_size ??
        event.payload.size ??
        1
      day.count += commits
      total += commits
      const repoShort = event.repo.name.split("/")[1] ?? event.repo.name
      day.repos[repoShort] = (day.repos[repoShort] ?? 0) + commits
    }

    return NextResponse.json({ days, total })
  } catch {
    return NextResponse.json({ days: [], total: 0 }, { status: 500 })
  }
}
