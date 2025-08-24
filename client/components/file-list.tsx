"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Download, File, RefreshCw, Trash2, FileText, ImageIcon, Video, Music, Archive } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type FileInfo = {
  name: string
  size?: number
  modified?: string
}

// const getFileIcon = (filename: string) => {
//   const ext = filename.split(".").pop()?.toLowerCase()

//   if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) {
//     return <ImageIcon className="h-5 w-5 text-blue-600" />
//   }
//   if (["mp4", "avi", "mov", "wmv", "flv"].includes(ext || "")) {
//     return <Video className="h-5 w-5 text-purple-600" />
//   }
//   if (["mp3", "wav", "flac", "aac"].includes(ext || "")) {
//     return <Music className="h-5 w-5 text-green-600" />
//   }
//   if (["zip", "rar", "7z", "tar", "gz"].includes(ext || "")) {
//     return <Archive className="h-5 w-5 text-orange-600" />
//   }
//   if (["txt", "doc", "docx", "pdf"].includes(ext || "")) {
//     return <FileText className="h-5 w-5 text-red-600" />
//   }

//   return <File className="h-5 w-5 text-slate-600" />
// }

const getFileIcon = (filename?: string) => {
  if (!filename) return <File className="h-5 w-5 text-slate-600" />;

  const ext = filename.split(".").pop()?.toLowerCase();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext || "")) return <ImageIcon className="h-5 w-5 text-blue-600" />;
  if (["mp4", "avi", "mov", "wmv", "flv"].includes(ext || "")) return <Video className="h-5 w-5 text-purple-600" />;
  if (["mp3", "wav", "flac", "aac"].includes(ext || "")) return <Music className="h-5 w-5 text-green-600" />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext || "")) return <Archive className="h-5 w-5 text-orange-600" />;
  if (["txt", "doc", "docx", "pdf"].includes(ext || "")) return <FileText className="h-5 w-5 text-red-600" />;

  return <File className="h-5 w-5 text-slate-600" />;
};
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function FileList() {
  const { toast } = useToast()
  const [files, setFiles] = useState<FileInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

//   const fetchFiles = async () => {
//     try {
//       const response = await fetch("/api/files")
//       if (!response.ok) throw new Error("Failed to fetch files")
//       const data = await response.json()
//       setFiles(data.files || [])
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to load files",
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//       setRefreshing(false)
//     }
//   }

const fetchFiles = async () => {
  try {
    const response = await fetch("/api/files")
    if (!response.ok) throw new Error("Failed to fetch files")
    const data = await response.json()

    // Map string array to objects
    const mappedFiles: FileInfo[] = (data.files || []).map((f: string) => ({
      name: f,
      size: undefined,
      modified: undefined,
    }))

    setFiles(mappedFiles)
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to load files",
      variant: "destructive",
    })
  } finally {
    setLoading(false)
    setRefreshing(false)
  }
}

  const downloadFile = async (filename: string) => {
    try {
      const response = await fetch(`/api/download/${encodeURIComponent(filename)}`)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Download started",
        description: `Downloading ${filename}`,
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: `Failed to download ${filename}`,
        variant: "destructive",
      })
    }
  }

  const deleteFile = async (filename: string) => {
    try {
      const response = await fetch(`/api/delete/${encodeURIComponent(filename)}`, {
        method: "DELETE",
      })
      if (!response.ok) throw new Error("Delete failed")

      setFiles((prev) => prev.filter((f) => f.name !== filename))
      toast({
        title: "File deleted",
        description: `${filename} has been deleted`,
      })
    } catch (error) {
      toast({
        title: "Delete failed",
        description: `Failed to delete ${filename}`,
        variant: "destructive",
      })
    }
  }

  const refreshFiles = () => {
    setRefreshing(true)
    fetchFiles()
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <Card className="border-slate-200/70 bg-white/70 backdrop-blur">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">{"Available files"}</CardTitle>
            <CardDescription className="text-slate-500">{"Files ready for download"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700">
              {files.length} {files.length === 1 ? "file" : "files"}
            </Badge>
            <Button variant="outline" size="sm" onClick={refreshFiles} disabled={refreshing}>
              <RefreshCw className={cn("mr-1.5 h-3.5 w-3.5", refreshing && "animate-spin")} />
              {"Refresh"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-6 w-6 animate-spin text-slate-400" />
              <span className="ml-2 text-sm text-slate-500">Loading files...</span>
            </div>
          ) : files.length === 0 ? (
            <div className="p-8 text-center">
              <File className="mx-auto h-12 w-12 text-slate-300" />
              <p className="mt-2 text-sm text-slate-500">No files available</p>
              <p className="text-xs text-slate-400">Upload some files to get started</p>
            </div>
          ) : (
            <div className="divide-y">
              {files.map((file, index) => (
                <div key={index} className="group flex items-center gap-3 p-4 hover:bg-slate-50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {getFileIcon(file.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {file.size && <span>{formatFileSize(file.size)}</span>}
                      {file.modified && (
                        <>
                          <span>•</span>
                          <span>{new Date(file.modified).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" onClick={() => downloadFile(file.name)} className="h-8 px-2">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteFile(file.name)}
                      className="h-8 px-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
