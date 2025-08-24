import { Upload, Download, Share2, Wifi, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUploader } from "@/components/file-uploader"
import { FileList } from "@/components/file-list"
import { ServerInfo } from "@/components/server-info"
import { ThemeToggle } from "@/components/theme-toggle"
import Ambient from "@/components/ambient"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-indigo-50 to-purple-50">
      <Ambient />

      <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/70 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm">
              <Share2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-4 text-slate-900">ShareHub</p>
              <p className="text-xs text-slate-500">Local File Sharing</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="hidden items-center gap-1 md:flex">
              <Wifi className="h-4 w-4" />
              {"Network sharing"}
            </div>
            <div className="hidden h-4 w-px bg-slate-300 md:block" />
            <div className="hidden items-center gap-1 md:flex">
              <Smartphone className="h-4 w-4" />
              {"Mobile friendly"}
            </div>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <section className="relative container mx-auto px-4 py-8 md:py-12 bg-gradient-to-br from-white">
        <div className="mb-8 grid gap-4 md:mb-12 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
              {"Local network sharing"}
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              {"Share files instantly across devices"}
            </h1>
            <p className="max-w-prose text-slate-600">
              {"Upload files from any device and download them on another. Perfect for quick file transfers"}
              {" between your phone, laptop, and other devices on the same network."}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm shadow-sm">
                <Upload className="h-4 w-4 text-slate-500" />
                {"Upload"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-1.5 text-sm shadow-sm">
                <Download className="h-4 w-4 text-slate-500" />
                {"Download"}
              </span>
            </div>
          </div>

          <Card className="border-slate-200/70 shadow-lg shadow-slate-900/5 md:order-last">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800">{"Upload files"}</CardTitle>
              <CardDescription className="text-slate-500">
                {"Drag & drop or click to select files to share"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FileList />
          </div>

          <div className="space-y-6">
            <ServerInfo />

            <Card className="border-slate-200/70 bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-slate-800">{"How to use"}</CardTitle>
                <CardDescription className="text-slate-500">{"Quick guide to sharing files"}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-700">
                  <li>{"• Upload files using the form above or drag & drop"}</li>
                  <li>{"• Files appear in the list and can be downloaded"}</li>
                  <li>{"• Share the server URL with other devices"}</li>
                  <li>{"• Access from any device on the same network"}</li>
                  <li>{"• Files are stored locally on the server"}</li>
                </ul>
                <div className="mt-4 rounded-md border bg-slate-50 p-3 text-xs text-slate-600">
                  {"Tip: Use QR codes to quickly share the server URL with mobile devices."}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="mt-10 border-t border-slate-200/60 bg-white/60 py-6 text-center text-xs text-slate-500 backdrop-blur">
        {"Built with Next.js, Flask, and modern web technologies"}
      </footer>
    </main>
  )
}
