import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getDocsByCategory } from "@/features/doc/data/documents"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { cn } from "@/lib/utils"

import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "./panel"
import { BlockItem } from "./blocks/block-item"

export function Components() {
  const components = getDocsByCategory("components")

  // Combine projects and components for the featured list
  const featuredItems = [
    ...PROJECTS.map(p => ({
      slug: p.id,
      title: p.title,
      description: p.description,
      link: p.link
    })),
    ...components.slice(0, 2).map(c => ({
      slug: c.slug,
      title: c.metadata.title,
      description: c.metadata.description,
      link: undefined
    }))
  ]

  return (
    <Panel id="components">
      <PanelHeader className="flex-col items-start gap-2">
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length + components.length})</PanelTitleSup>
        </PanelTitle>
        <p className="font-mono text-sm text-muted-foreground">
          A collection of beautifully designed, production-ready blocks.
        </p>
      </PanelHeader>

      <div className="screen-line-before px-4 pt-4 pb-2">
        <div className="flex flex-wrap gap-4 text-sm font-medium text-muted-foreground">
          <button className="text-foreground underline decoration-2 underline-offset-8">Featured</button>
          <button className="hover:text-foreground">Marketing</button>
          <button className="hover:text-foreground">Content</button>
          <button className="hover:text-foreground">Application</button>
        </div>
      </div>

      <div className="flex flex-col">
        {featuredItems.map((item, index) => (
          <div key={item.slug} className="relative">
            {index > 0 && <div className="screen-line-before h-px w-full" />}
            <BlockItem 
              name={item.slug} 
              title={item.title} 
              description={item.description} 
              link={item.link}
            />
          </div>
        ))}
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button className="px-3" variant="default" asChild>
          <Link href="/components">
            All Projects
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  )
}
