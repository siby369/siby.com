"use client"

import {
  LaptopIcon,
  MonitorIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"
import React, { useMemo, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Index } from "@/__registry__/index"

export function BlockItem({
  name,
  title,
  description,
  link,
}: {
  name: string
  title: string
  description?: string
  link?: string
}) {
  const [replay, setReplay] = useState(0)
  const [device, setDevice] = useState<string>("desktop")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const Preview = useMemo(() => {
    const Component = Index[name]?.component
    if (Component) return <Component />
    
    if (link && link !== "#") {
      return (
        <iframe
          ref={iframeRef}
          src={link}
          className="h-full w-full border-none"
          title={title}
        />
      )
    }

    return null
  }, [name, link, title])

  const handleRefresh = () => {
    setReplay((v) => v + 1)
    if (iframeRef.current && link) {
      iframeRef.current.src = link
    }
  }

  const deviceWidths: Record<string, string> = {
    mobile: "max-w-[375px]",
    tablet: "max-w-[768px]",
    desktop: "max-w-full"
  }

  return (
    <div className="group/block relative flex flex-col gap-4 py-8 px-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-lg border bg-muted/50 p-1 lg:flex">
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className={cn("h-6 w-6", device === "mobile" && "bg-background shadow-xs")}
                onClick={() => setDevice("mobile")}
              >
                <SmartphoneIcon className="size-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className={cn("h-6 w-6", device === "tablet" && "bg-background shadow-xs")}
                onClick={() => setDevice("tablet")}
              >
                <TabletIcon className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className={cn("h-6 w-6", device === "desktop" && "bg-background shadow-xs")}
                onClick={() => setDevice("desktop")}
              >
                <MonitorIcon className="size-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon-xs" 
                className="h-6 w-6"
              >
                <LaptopIcon className="size-3.5" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleRefresh}
            >
              <RotateCcwIcon className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="relative mt-0 min-h-[400px] overflow-hidden rounded-xl border bg-background flex justify-center">
          <div
            key={replay}
            className={cn(
              "flex h-[400px] w-full items-center justify-center transition-all duration-500 ease-in-out",
              deviceWidths[device]
            )}
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {Preview}
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
