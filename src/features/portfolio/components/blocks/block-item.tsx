"use client"

import {
  ExternalLinkIcon,
  LaptopIcon,
  MonitorIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"
import React, { useMemo, useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/base/ui/tooltip"
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

    return (
      <div className="flex flex-col items-center justify-center text-center p-12 gap-4">
        <div className="size-16 rounded-2xl bg-muted flex items-center justify-center border border-dashed">
          <MonitorIcon className="size-8 text-muted-foreground" />
        </div>
        <div>
          <h3 className="font-medium text-lg">No Preview Available</h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            {description || "This project doesn't have a live preview yet."}
          </p>
        </div>
      </div>
    )
  }, [name, link, title, description])

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
    <div id={name} className="flex min-w-0 scroll-mt-14 flex-col-reverse items-stretch gap-2 p-2 md:flex-col lg:pr-0">
      <div className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-2 px-2 max-lg:hidden">
          <div className="flex h-8 items-center gap-2 rounded-lg p-0.5 bg-zinc-100 dark:bg-zinc-900 px-3">
            <span className="text-xs font-medium">Preview</span>
          </div>
          
          <Separator orientation="vertical" className="mx-2 h-4 self-center" />
          
          <a href={`#${name}`} className="line-clamp-1 text-sm font-medium underline-offset-4 hover:underline">
            {title}
          </a>

          <div className="ml-auto flex items-center gap-2">
            <div className="flex h-8 items-center gap-1 rounded-lg border p-1">
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
            </div>

            <Separator orientation="vertical" className="h-4" />

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon-xs" className="h-6 w-6" asChild>
                    <a href={link} target="_blank" rel="noopener">
                      <ExternalLinkIcon className="size-3.5" />
                    </a>
                  </Button>
                }
              />
              <TooltipContent>Open in New Tab</TooltipContent>
            </Tooltip>

            <Separator orientation="vertical" className="h-4" />

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="ghost" size="icon-xs" className="h-6 w-6" onClick={handleRefresh}>
                    <RotateCcwIcon className="size-3.5" />
                  </Button>
                }
              />
              <TooltipContent>Refresh Preview</TooltipContent>
            </Tooltip>
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
            <React.Suspense fallback={<div className="text-sm text-muted-foreground animate-pulse">Loading preview...</div>}>
              {Preview}
            </React.Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
