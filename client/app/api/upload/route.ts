const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const response = await fetch(`${FLASK_BASE_URL}/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      return Response.json({ error: error || "Upload failed" }, { status: response.status })
    }

    const result = await response.text()
    return Response.json({ message: result })
  } catch (error) {
    return Response.json({ error: "Failed to connect to Flask server" }, { status: 502 })
  }
}
