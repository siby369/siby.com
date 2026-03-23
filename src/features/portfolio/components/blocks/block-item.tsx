"use client"

import {
  LaptopIcon,
  MonitorIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  TabletIcon,
} from "lucide-react"
import React, { useMemo, useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Index } from "@/__registry__/index"

export function BlockItem({
  name,
  title,
  description,
}: {
  name: string
  title: string
  description?: string
}) {
  const [replay, setReplay] = useState(0)

  const Preview = useMemo(() => {
    const Component = Index[name]?.component
    if (!Component) return null
    return <Component />
  }, [name])

  const sourceCode = useMemo(() => {
    return `import React from "react"
import { cn } from "@/lib/utils"

export default function ${name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')}() {
  return (
    <div className="flex items-center justify-center p-8">
      <h1 className="text-2xl font-bold">${title}</h1>
    </div>
  )
}`
  }, [name, title])

  return (
    <div className="group/block relative flex flex-col gap-4 py-8 px-4">
      <Tabs defaultValue="preview" className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <TabsList className="h-8 p-0.5">
              <TabsTrigger
                value="preview"
                className="h-7 rounded-md px-3 text-xs"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="h-7 rounded-md px-3 text-xs">
                Code
              </TabsTrigger>
              <TabsIndicator />
            </TabsList>

            <span className="hidden text-sm font-medium text-muted-foreground md:inline-block">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-lg border bg-muted/50 p-1 lg:flex">
              <Button variant="ghost" size="icon-xs" className="h-6 w-6">
                <SmartphoneIcon className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" className="h-6 w-6">
                <TabletIcon className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="h-6 w-6 bg-background shadow-xs"
              >
                <MonitorIcon className="size-3.5" />
              </Button>
              <Button variant="ghost" size="icon-xs" className="h-6 w-6">
                <LaptopIcon className="size-3.5" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setReplay((v) => v + 1)}
            >
              <RotateCcwIcon className="size-3.5" />
            </Button>

            <div className="hidden items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1 font-mono text-xs sm:flex">
              <span className="text-muted-foreground">$</span>
              <span>npx shadcn add @siby369/{name}</span>
            </div>
          </div>
        </div>

        <TabsContent
          value="preview"
          className="relative mt-0 min-h-[400px] overflow-hidden rounded-xl border bg-background"
        >
          <div
            key={replay}
            className="flex h-full min-h-[400px] w-full items-center justify-center p-4"
          >
            <React.Suspense fallback={<div>Loading...</div>}>
              {Preview}
            </React.Suspense>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-0 overflow-hidden rounded-xl border bg-zinc-950">
          <div className="max-h-[600px] overflow-auto p-4">
             <pre className="font-mono text-xs leading-relaxed text-zinc-400">
               <code>{sourceCode}</code>
             </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
