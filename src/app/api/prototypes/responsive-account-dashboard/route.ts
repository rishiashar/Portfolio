const PROTOTYPE_ORIGIN =
  "https://responsive-account-dashboard-layout.vercel.app"

export const dynamic = "force-dynamic"

function rewritePrototypeHtml(html: string) {
  const withAbsoluteAssets = html
    .replaceAll('"/_next/', `"${PROTOTYPE_ORIGIN}/_next/`)
    .replaceAll("'/_next/", `'${PROTOTYPE_ORIGIN}/_next/`)
    .replaceAll('href="/', `href="${PROTOTYPE_ORIGIN}/`)
    .replaceAll("href='/", `href='${PROTOTYPE_ORIGIN}/`)
    .replaceAll('src="/', `src="${PROTOTYPE_ORIGIN}/`)
    .replaceAll("src='/", `src='${PROTOTYPE_ORIGIN}/`)

  return withAbsoluteAssets.replace(
    "</head>",
    `<base href="${PROTOTYPE_ORIGIN}/" />
<style>
  html,
  body {
    margin: 0;
    min-height: 100%;
    overflow: hidden;
    background: #f9f9f9;
    color-scheme: light;
  }
</style>
</head>`
  )
}

export async function GET() {
  const response = await fetch(PROTOTYPE_ORIGIN, {
    cache: "no-store",
    headers: {
      Accept: "text/html",
      "User-Agent": "rishiashar-portfolio-prototype-frame",
    },
  })

  if (!response.ok) {
    return new Response("Prototype failed to load.", {
      status: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  }

  const html = await response.text()

  return new Response(rewritePrototypeHtml(html), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
