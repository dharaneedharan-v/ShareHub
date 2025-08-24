"use client"

export default function Ambient() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-300/10 blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </>
  )
}
