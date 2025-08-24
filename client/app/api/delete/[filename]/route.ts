// const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001"

// // export async function DELETE(request: Request, { params }: { params: { filename: string } }) {
// //   try {
// //     const filename = decodeURIComponent(params.filename)

// //     const response = await fetch(`${FLASK_BASE_URL}/api/delete/${encodeURIComponent(filename)}`, {
// //       method: "DELETE",
// //     })

// //     if (!response.ok) {
// //       return Response.json({ error: "Failed to delete file" }, { status: response.status })
// //     }

// //     return Response.json({ message: "File deleted successfully" })
// //   } catch (error) {
// //     return Response.json({ error: "Failed to connect to Flask server" }, { status: 502 })
// //   }
// // }

// export async function DELETE(
//   request: Request,
//   context: { params: { filename: string } }
// ) {
//   // Await params before using
//   const { params } = await context;
//   const filename = decodeURIComponent(params.filename);

//   try {
//     const response = await fetch(
//       `${FLASK_BASE_URL}/api/delete/${encodeURIComponent(filename)}`,
//       { method: "DELETE" }
//     );
//     const data = await response.json();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Delete failed" }), { status: 500 });
//   }
// }


const FLASK_BASE_URL = process.env.FLASK_BASE_URL || "http://localhost:5001";
import type { NextRequest } from "next/server";

// For Next.js 15: params is now a Promise
export async function DELETE(
  request: NextRequest, 
  { params }: { params: Promise<{ filename: string }> }
) {
  // Await the params Promise in Next.js 15
  const { filename } = await params;
  const decodedFilename = decodeURIComponent(filename);

  try {
    const response = await fetch(
      `${FLASK_BASE_URL}/api/delete/${encodeURIComponent(decodedFilename)}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to delete file" }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to connect to Flask server" }),
      { status: 502 }
    );
  }
}