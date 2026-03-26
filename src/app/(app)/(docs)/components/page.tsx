import type { Metadata } from "next"
import Link from "next/link"

import { UTM_PARAMS } from "@/config/site"
import { getDocsByCategory } from "@/features/doc/data/documents"
import { PROJECTS } from "@/features/portfolio/data/projects"
import type { Doc } from "@/features/doc/types/document"
import { cn } from "@/lib/utils"
import { BlockItem } from "@/features/portfolio/components/blocks/block-item"

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of beautifully designed, production-ready blocks.",
}

export default function Page() {
  const components = getDocsByCategory("components")

  // Combine projects and components for the full list
  const allItems = [
    ...PROJECTS.map(p => ({
      slug: p.id,
      title: p.title,
      description: p.description,
      link: p.link,
      category: "project"
    })),
    ...components.map(c => ({
      slug: c.slug,
      title: c.metadata.title,
      description: c.metadata.description,
      link: undefined,
      category: "component"
    }))
  ]

  return (
    <div className="min-h-svh">
      <div className="screen-line-bottom h-8 before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"></div>
      
      <div className="screen-line-bottom px-4 pt-2 pb-4">
        <h1 className="text-3xl leading-none font-semibold tracking-tight">
          Projects
        </h1>
      </div>

      <div className="screen-line-bottom p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      <div className="no-scrollbar max-w-full overflow-x-auto scroll-fade-effect-x p-4 whitespace-nowrap">
        <nav className="flex items-center gap-4">
          <button className="font-mono text-sm font-medium transition-[color] hover:text-foreground text-foreground underline decoration-2 underline-offset-8">Featured</button>
          <button className="font-mono text-sm font-medium text-muted-foreground transition-[color] hover:text-foreground">Marketing</button>
          <button className="font-mono text-sm font-medium text-muted-foreground transition-[color] hover:text-foreground">Content</button>
          <button className="font-mono text-sm font-medium text-muted-foreground transition-[color] hover:text-foreground">Application</button>
        </nav>
      </div>

      <div className="screen-line-top screen-line-bottom relative">
        <div className="h-8 before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"></div>
      </div>

      <div className="flex flex-col">
        {allItems.map((item, index) => (
          <div key={item.slug} className="relative">
            {index > 0 && (
              <div className="screen-line-top screen-line-bottom relative">
                <div className="h-8 before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw] before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"></div>
              </div>
            )}
            <BlockItem 
              name={item.slug} 
              title={item.title} 
              description={item.description} 
              link={item.link}
            />
          </div>
        ))}
      </div>

      <div className="screen-line-top p-2">
        <div className="rounded-xl border border-dashed p-4">
          <p className="font-mono text-sm text-muted-foreground">
            // More projects on the way…
          </p>
        </div>
      </div>
    </div>
  )
}
