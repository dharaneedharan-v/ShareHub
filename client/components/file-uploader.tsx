"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type UploadStatus = "idle" | "uploading" | "success" | "error"

type FileUpload = {
  file: File
  status: UploadStatus
  progress: number
  error?: string
}

export function FileUploader() {
  const { toast } = useToast()
  const [uploads, setUploads] = useState<FileUpload[]>([])

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Upload failed")
      }

      return await response.json()
    } catch (error) {
      throw error instanceof Error ? error : new Error("Upload failed")
    }
  }

  const handleUpload = useCallback(
    async (files: File[]) => {
      const newUploads: FileUpload[] = files.map((file) => ({
        file,
        status: "uploading" as const,
        progress: 0,
      }))

      setUploads((prev) => [...prev, ...newUploads])

      for (let i = 0; i < newUploads.length; i++) {
        const upload = newUploads[i]
        const uploadIndex = uploads.length + i

        try {
          // Simulate progress
          const progressInterval = setInterval(() => {
            setUploads((prev) =>
              prev.map((u, idx) => (idx === uploadIndex ? { ...u, progress: Math.min(u.progress + 10, 90) } : u)),
            )
          }, 100)

          await uploadFile(upload.file)

          clearInterval(progressInterval)

          setUploads((prev) =>
            prev.map((u, idx) => (idx === uploadIndex ? { ...u, status: "success", progress: 100 } : u)),
          )

          toast({
            title: "Upload successful",
            description: `${upload.file.name} has been uploaded`,
          })

          // Remove successful upload after 3 seconds
          setTimeout(() => {
            setUploads((prev) => prev.filter((_, idx) => idx !== uploadIndex))
          }, 3000)
        } catch (error) {
          setUploads((prev) =>
            prev.map((u, idx) =>
              idx === uploadIndex
                ? {
                    ...u,
                    status: "error",
                    progress: 0,
                    error: error instanceof Error ? error.message : "Upload failed",
                  }
                : u,
            ),
          )

          toast({
            title: "Upload failed",
            description: `Failed to upload ${upload.file.name}`,
            variant: "destructive",
          })
        }
      }
    },
    [uploads.length, toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleUpload,
    multiple: true,
  })

  const removeUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, idx) => idx !== index))
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-2 text-sm font-medium text-slate-900">
          {isDragActive ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-slate-500">{"or click to select files from your device"}</p>
        <Button variant="outline" className="mt-4 bg-transparent" type="button">
          {"Select Files"}
        </Button>
      </div>

      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((upload, index) => (
            <Card key={index} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {upload.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : upload.status === "error" ? (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    ) : (
                      <File className="h-5 w-5 text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{upload.file.name}</p>
                    <p className="text-xs text-slate-500">{(upload.file.size / 1024 / 1024).toFixed(2)} MB</p>

                    {upload.status === "uploading" && <Progress value={upload.progress} className="mt-2 h-1" />}

                    {upload.status === "error" && upload.error && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription className="text-xs">{upload.error}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <Button variant="ghost" size="sm" onClick={() => removeUpload(index)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
