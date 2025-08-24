const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001"

export async function GET() {
  try {
    const response = await fetch(`${FLASK_BASE_URL}/api/files`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return Response.json({ error: "Failed to fetch files" }, { status: 500 })
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: "Failed to connect to Flask server" }, { status: 502 })
  }
}
