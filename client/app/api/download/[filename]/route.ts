// const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001"

// export async function GET(request: Request, { params }: { params: { filename: string } }) {
//   try {
//     const filename = decodeURIComponent(params.filename)

//     const response = await fetch(`${FLASK_BASE_URL}/download/${encodeURIComponent(filename)}`)

//     if (!response.ok) {
//       return Response.json({ error: "File not found" }, { status: 404 })
//     }

//     const blob = await response.blob()

//     return new Response(blob, {
//       headers: {
//         "Content-Disposition": `attachment; filename="${filename}"`,
//         "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
//       },
//     })
//   } catch (error) {
//     return Response.json({ error: "Failed to download file" }, { status: 500 })
//   }
// }

const FLASK_BASE_URL = "https://sharehub-1obp.onrender.com"; // Render backend


// const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001";
import type { NextRequest } from "next/server";

// For Next.js 15: params is now a Promise
export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ filename: string }> }
) {
  // Await the params Promise in Next.js 15
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);
  
  try {
    const response = await fetch(`${FLASK_BASE_URL}/download/${encodeURIComponent(decodedFilename)}`);
    
    if (!response.ok) {
      return Response.json({ error: "File not found" }, { status: 404 });
    }
    
    const blob = await response.blob();
    
    return new Response(blob, {
      headers: {
        "Content-Disposition": `attachment; filename="${decodedFilename}"`,
        "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    return Response.json({ error: "Failed to download file" }, { status: 500 });
  }
}