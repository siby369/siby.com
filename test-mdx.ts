import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "./src/components/base/ui/tabs"
import { CodeCollapsibleWrapper } from "./src/components/code-collapsible-wrapper"
import { ComponentSource } from "./src/components/component-source"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./src/components/ui/table"
import { Code, Heading } from "./src/components/ui/typography"
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
  TestimonialVerifiedBadge,
} from "./src/registry/components/testimonial"
import { CodeTabs } from "./src/components/code-tabs"
import { ComponentPreviewV2 as ComponentPreview } from "./src/components/component-preview-v2"
import { FramedImage, IframeEmbed, YouTubeEmbed } from "./src/components/embed"
import { mdxCodeBlockComponents } from "./src/components/mdx-code-block"

const components = {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
  CodeCollapsibleWrapper,
  ComponentSource,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Code,
  Heading,
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
  TestimonialVerifiedBadge,
  CodeTabs,
  ComponentPreview,
  FramedImage,
  IframeEmbed,
  YouTubeEmbed,
  mdxCodeBlockComponents
}

for (const [key, value] of Object.entries(components)) {
  if (value === undefined) {
    console.error(`ERROR: ${key} is undefined`)
  }
}
console.log("Check complete")
