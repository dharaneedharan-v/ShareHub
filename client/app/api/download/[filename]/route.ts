const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001"

export async function GET(request: Request, { params }: { params: { filename: string } }) {
  try {
    const filename = decodeURIComponent(params.filename)

    const response = await fetch(`${FLASK_BASE_URL}/download/${encodeURIComponent(filename)}`)

    if (!response.ok) {
      return Response.json({ error: "File not found" }, { status: 404 })
    }

    const blob = await response.blob()

    return new Response(blob, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      },
    })
  } catch (error) {
    return Response.json({ error: "Failed to download file" }, { status: 500 })
  }
}
