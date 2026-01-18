import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./src/components/base/ui/tooltip"
import { InlineTOC } from "./src/components/inline-toc"
import { MDX } from "./src/components/mdx"
import { Button } from "./src/components/ui/button"
import { Kbd } from "./src/components/ui/kbd"
import { Prose } from "./src/components/ui/typography"
import { PostKeyboardShortcuts } from "./src/features/blog/components/post-keyboard-shortcuts"
import { LLMCopyButtonWithViewOptions } from "./src/features/blog/components/post-page-actions"
import { PostShareMenu } from "./src/features/blog/components/post-share-menu"

const components = {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  InlineTOC,
  MDX,
  Button,
  Kbd,
  Prose,
  PostKeyboardShortcuts,
  LLMCopyButtonWithViewOptions,
  PostShareMenu
}

for (const [key, value] of Object.entries(components)) {
  if (value === undefined) {
    console.error(`ERROR: ${key} is undefined`)
  }
}
console.log("Page components check complete")
