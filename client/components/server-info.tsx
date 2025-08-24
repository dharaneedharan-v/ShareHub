// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Server, Wifi, Copy, QrCode, ExternalLink } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// type ServerStatus = {
//   ip: string
//   port: number
//   protocol: string
//   status: "online" | "offline"
// }

// export function ServerInfo() {
//   const { toast } = useToast()
//   const [serverInfo, setServerInfo] = useState<ServerStatus | null>(null)

//   useEffect(() => {
//     // In a real app, you'd fetch this from your API
//     setServerInfo({
//       ip: "192.168.1.100", // This would come from your Flask server
//       port: 5001,
//       protocol: "http",
//       status: "online",
//     })
//   }, [])

//   const copyUrl = async () => {
//     if (!serverInfo) return

//     const url = `${serverInfo.protocol}://${serverInfo.ip}:${serverInfo.port}`
//     await navigator.clipboard.writeText(url)
//     toast({
//       title: "URL copied",
//       description: "Server URL copied to clipboard",
//     })
//   }

//   const openInBrowser = () => {
//     if (!serverInfo) return

//     const url = `${serverInfo.protocol}://${serverInfo.ip}:${serverInfo.port}`
//     window.open(url, "_blank")
//   }

//   if (!serverInfo) {
//     return (
//       <Card className="border-slate-200/70 bg-white/70 backdrop-blur">
//         <CardContent className="p-6">
//           <div className="flex items-center justify-center">
//             <Server className="h-6 w-6 animate-pulse text-slate-400" />
//             <span className="ml-2 text-sm text-slate-500">Loading server info...</span>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   const serverUrl = `${serverInfo.protocol}://${serverInfo.ip}:${serverInfo.port}`

//   return (
//     <Card className="border-slate-200/70 bg-white/70 backdrop-blur">
//       <CardHeader>
//         <div className="flex items-center justify-between">
//           <div>
//             <CardTitle className="text-slate-800">{"Server info"}</CardTitle>
//             <CardDescription className="text-slate-500">{"Share this URL with other devices"}</CardDescription>
//           </div>
//           <Badge
//             className={
//               serverInfo.status === "online"
//                 ? "bg-green-600 text-white hover:bg-green-600"
//                 : "bg-red-600 text-white hover:bg-red-600"
//             }
//           >
//             <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-current" />
//             {serverInfo.status}
//           </Badge>
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="rounded-md border bg-slate-50 p-3">
//           <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
//             <Wifi className="h-3.5 w-3.5" />
//             {"Network URL"}
//           </div>
//           <p className="font-mono text-sm text-slate-900 break-all">{serverUrl}</p>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <Button variant="outline" size="sm" onClick={copyUrl}>
//             <Copy className="mr-1.5 h-3.5 w-3.5" />
//             {"Copy URL"}
//           </Button>
//           <Button variant="outline" size="sm" onClick={openInBrowser}>
//             <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
//             {"Open"}
//           </Button>
//           <Button variant="outline" size="sm">
//             <QrCode className="mr-1.5 h-3.5 w-3.5" />
//             {"QR Code"}
//           </Button>
//         </div>

//         <div className="text-xs text-slate-600 space-y-1">
//           <p>{"• Make sure devices are on the same network"}</p>
//           <p>{"• Use QR code for easy mobile access"}</p>
//           <p>{"• Files are stored locally on this device"}</p>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
// ===========================================================
// 




"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ServerStatus = {
  ip: string
  port: number
  protocol: string
  status: "online" | "offline"
  url?: string
  qr?: string
}

export function ServerInfo() {
  const { toast } = useToast()
  const [serverInfo, setServerInfo] = useState<ServerStatus>({
    ip: "localhost",
    port: 5001,
    protocol: "http",
    status: "offline",
  })

  // Replace this with your LAN IP and port
  const LAN_API = "http://10.10.71.1:5001/api/server-info"

  const fetchServerInfo = async () => {
    try {
      const res = await fetch(LAN_API, { cache: "no-store" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setServerInfo(data)
    } catch {
      setServerInfo((p) => ({ ...p, status: "offline" }))
    }
  }

  useEffect(() => {
    fetchServerInfo()
    const id = setInterval(fetchServerInfo, 5000)
    return () => clearInterval(id)
  }, [])

  const serverUrl = serverInfo.url || `${serverInfo.protocol}://${serverInfo.ip}:${serverInfo.port}`

  return (
    <Card className="border-slate-200/70 bg-white/70 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Server info</CardTitle>
            <CardDescription>Share this URL with other devices</CardDescription>
          </div>
          <Badge className={serverInfo.status === "online" ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
            <span className="mr-1 inline-flex h-2 w-2 rounded-full bg-current" />
            {serverInfo.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border bg-slate-50 p-3">
          <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
            <Wifi className="h-3.5 w-3.5" /> Network URL
          </div>
          <p className="font-mono text-sm text-slate-900 break-all">{serverUrl}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={async () => {
            await navigator.clipboard.writeText(serverUrl)
            toast({ title: "URL copied", description: "Server URL copied to clipboard" })
          }}>Copy URL</Button>

          <Button variant="outline" size="sm" onClick={() => window.open(serverUrl, "_blank")}>Open</Button>
        </div>

        {serverInfo.qr && (
          <div className="my-2 flex justify-center">
            <img src={serverInfo.qr} alt="Server QR Code" className="h-32 w-32" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
