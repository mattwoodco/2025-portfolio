# MDX Implementation Plan for Portfolio

## **1. Overview**

### **Current State**

- Next.js 15.5.3 with React 19 and Tailwind CSS v4 (CSS-based config)
- shadcn/ui components already configured
- Streamdown dependency already installed (v1.3.0)
- Basic MDX content exists in `content/projects/fmglobal.mdx`
- Project uses TypeScript and modern Next.js app router
- Tailwind v4 uses CSS imports instead of JavaScript config

### **Desired State**

- Native MDX integration using Next.js built-in `@next/mdx` support
- Direct MDX file rendering in app directory routes
- Custom MDX components with Tailwind Typography styling
- Streamlined content authoring workflow
- SEO-optimized MDX pages with proper metadata
- Type-safe MDX component system
- Optional remote MDX support for CMS/database content

### **Key Objectives**

- Enable native MDX file rendering using `@next/mdx`
- Create reusable MDX components via `mdx-components.tsx`
- Support both local MDX files and remote MDX content
- Implement proper metadata and frontmatter handling
- Optimize for performance and SEO
- Maintain consistency with existing design system

## **2. Required Dependencies**

### **Core MDX Dependencies**

```bash
# Native MDX support
npm install @next/mdx @mdx-js/loader @mdx-js/react

# Typography and styling
npm install @tailwindcss/typography@next# v4-compatible version# MDX plugins
npm install rehype-highlight rehype-slug rehype-autolink-headings# For syntax highlighting and navigation
npm install remark-gfm remark-frontmatter# For GitHub Flavored Markdown and frontmatter support# Frontmatter parsing (for utility functions)
npm install gray-matter reading-time

```

### **Optional Dependencies (for remote MDX)**

```bash
# Only needed if using remote MDX from CMS/database
npm install next-mdx-remote

```

### **Installation Command**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @tailwindcss/typography@next gray-matter rehype-highlight rehype-slug rehype-autolink-headings remark-gfm remark-frontmatter reading-time

```

## **3. Configuration Steps**

### **Next.js Configuration (`next.config.ts`)**

```tsx
import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const nextConfig: NextConfig = {
// Configure pageExtensions to include MDX filespageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
// Optional: Rust compiler for faster buildsexperimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
// Add markdown plugins hereoptions: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
    ],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
});

// Export MDX-enhanced configexport default withMDX(nextConfig);

```

### **Tailwind CSS v4 Typography Configuration**

Since you're using Tailwind CSS v4, all configuration happens in CSS, not JavaScript config files:

```css
/* app/globals.css - Add after existing Tailwind imports */@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Optional: Customize prose styles using CSS variables */@theme {
  --prose-body: var(--color-foreground);
  --prose-headings: var(--color-foreground);
  --prose-links: var(--color-primary);
  --prose-code: var(--color-foreground);
  --prose-pre-bg: var(--color-muted);
  --prose-pre-code: var(--color-muted-foreground);
}

```

**Important Notes for Tailwind CSS v4:**

- Use `@plugin "@tailwindcss/typography"` instead of `@import` for the typography plugin
- All configuration is CSS-based, no JavaScript config needed
- Prose styles can be customized using CSS variables within the `@theme` directive
- The prose utility classes are automatically available once the plugin is loaded

### **MDX Components Configuration (`mdx-components.tsx`)**

Create in project root. These components integrate with the Tailwind Typography plugin by using the `prose` utility classes:

```tsx
import type { MDXComponents } from 'mdx/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
// Wrapper components that work with prose classes// Note: When using in MDX pages, wrap content with prose utilities// Custom heading components with anchor linksh1: ({ children, id }) => (
      <h1 id={id} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
// Custom paragraph with better spacingp: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
// Custom code blockspre: ({ children }) => (
      <pre className="overflow-x-auto rounded-lg border bg-muted px-4 py-3">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {children}
      </code>
    ),
// Custom image componentimg: ({ src, alt, ...props }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg"
        {...props}
      />
    ),
// Custom link componenta: ({ href, children, ...props }) => (
      <Link href={href || ''} className="text-primary underline underline-offset-4" {...props}>
        {children}
      </Link>
    ),
// Custom componentsButton,
    ...components,
  };
}

```

**Integration with Tailwind Typography:** When rendering MDX content, wrap it with the `prose` utility classes to apply Typography plugin styles:

```tsx
// In your MDX page component
<div className="prose prose-stone dark:prose-invert max-w-none">
  <MDXContent content={content} />
</div>

```

This ensures that:

- Typography plugin styles are applied to standard markdown elements
- Custom MDX components override specific elements as needed
- Dark mode is properly handled with `dark:prose-invert`
- Element-specific modifiers can be used (e.g., `prose-a:text-blue-600`)

## **4. File Structure**

### **Recommended Content Organization**

**Option 1: Direct MDX Routes (Recommended)**

```
app/
├── projects/
│   ├── fmglobal/
│   │   └── page.mdx      # Direct MDX page
│   ├── project-2/
│   │   └── page.mdx
│   └── [slug]/
│       └── page.tsx      # Dynamic route for programmatic MDX
├── blog/
│   ├── post-1/
│   │   └── page.mdx
│   └── [slug]/
│       └── page.tsx
└── about/
    └── page.mdx          # Static MDX pages

```

**Option 2: Centralized Content Directory**

```
content/
├── projects/
│   ├── fmglobal.mdx
│   ├── project-2.mdx
│   └── project-3.mdx
├── blog/
│   ├── post-1.mdx
│   └── post-2.mdx
└── pages/
    ├── about.mdx
    └── services.mdx

```

**Content Organization Strategy:**

- Use Option 1 for static, SEO-critical content (leverages Next.js native MDX)
- Use Option 2 for dynamic content that needs programmatic access
- Frontmatter for metadata when using centralized content
- Direct exports for metadata when using MDX pages

### **MDX File Naming Conventions**

- Use kebab-case for file names: `my-project-name.mdx`
- Keep names descriptive and SEO-friendly
- Use consistent frontmatter structure

### **Component Structure for MDX**

```
components/
├── mdx/               # MDX-specific components
│   ├── ProjectCard.tsx
│   ├── Callout.tsx
│   ├── CodeBlock.tsx
│   ├── ImageGallery.tsx
│   ├── MDXContent.tsx
│   └── TableOfContents.tsx
├── ui/                # Existing shadcn components
└── content/           # Content-related layout components
    └── ContentLayout.tsx

```

## **5. Implementation Steps**

### **Step 1: Install Dependencies**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @tailwindcss/typography@next gray-matter rehype-highlight rehype-slug rehype-autolink-headings remark-gfm reading-time @types/mdx

```

### **Step 2: Update Next.js Configuration**

Update `next.config.ts` with MDX configuration as shown above.

### **Step 3: Create MDX Components File**

Create `mdx-components.tsx` in the project root.

### **Step 4: Update CSS for Tailwind v4 Typography**

Add Typography plugin to `app/globals.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Optional: Add custom prose theme variables */@theme {
  --prose-body: var(--color-foreground);
  --prose-headings: var(--color-foreground);
  --prose-links: var(--color-primary);
}

```

No JavaScript configuration needed with Tailwind CSS v4!

### **Step 5: Create Content Utilities**

Create `lib/content.ts`:

```tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface FrontMatter {
  title: string;
  description?: string;
  type: 'project' | 'blog' | 'page';
  category?: string;
  client?: string;
  metric?: string;
  imageUrl?: string;
  date?: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
}

export interface ContentItem {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export function getContentBySlug(slug: string): ContentItem | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontMatter: data as FrontMatter,
      content,
      readingTime: readingTime(content),
    };
  } catch (error) {
    return null;
  }
}

export function getAllContent(type?: string): ContentItem[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      return getContentBySlug(slug);
    })
    .filter((item): item is ContentItem => item !== null)
    .filter(item => {
// Filter by content type if specifiedif (type && item.frontMatter.type !== type) {
        return false;
      }
// Only show published contentreturn item.frontMatter.published !== false;
    })
    .sort((a, b) => {
      if (a.frontMatter.date && b.frontMatter.date) {
        return new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime();
      }
      return 0;
    });
}

export function getContentByType(type: string): ContentItem[] {
  return getAllContent(type);
}

export function getFeaturedContent(): ContentItem[] {
  return getAllContent().filter(item => item.frontMatter.featured === true);
}

export function getContentByCategory(category: string): ContentItem[] {
  return getAllContent().filter(item =>
    item.frontMatter.category === category ||
    item.frontMatter.tags?.includes(category)
  );
}

```

### **Step 6: Create MDX Routes**

### **Option A: Direct MDX Pages (Recommended)**

Create `app/projects/fmglobal/page.mdx`:

```
export const metadata = {
  title: 'FM Global Production Flow Optimization',
  description: 'Streamlined production workflow reducing processing time by 40%',
};

# FM Global Production Flow Optimization

<ProjectMetadata
  client="FM Global"
  metric="40% faster processing"
  category="process-improvement"
/>

This project involved optimizing FM Global's production flow diagram process...

<Callout type="success">
  This optimization resulted in a 40% reduction in processing time.
</Callout>

## Challenge

The existing workflow had several bottlenecks...

```

### **Option B: Dynamic MDX Routes (for programmatic content)**

Create `app/projects/[slug]/page.tsx`:

```tsx
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface ProjectPageProps {
  params: { slug: string };
}

// For dynamic MDX imports from content directoryexport async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
// Import the MDX file's metadataconst { metadata } = await import(`@/content/projects/${params.slug}.mdx`);
    return metadata;
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
// Define your project slugsconst projects = ['fmglobal', 'project-2', 'project-3'];
  return projects.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
// Dynamically import the MDX contentconst MDXContent = dynamic(
      () => import(`@/content/projects/${params.slug}.mdx`),
      { loading: () => <p>Loading...</p> }
    );

    return (
      <article className="container mx-auto px-4 py-8">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </article>
    );
  } catch (error) {
    notFound();
  }
}

```

### **Step 7: Create Supporting Components**

### **Remote MDX Component (Only for CMS/Database content)**

Create `components/mdx/RemoteMDXContent.tsx`:

```tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

interface RemoteMDXContentProps {
  source: string;// MDX string from API/database
}

export async function RemoteMDXContent({ source }: RemoteMDXContentProps) {
  const components = useMDXComponents({});

  return (
    <MDXRemote
      source={source}
      components={components}
    />
  );
}

```

### **Project Metadata Component**

Create `components/mdx/ProjectMetadata.tsx`:

```tsx
interface ProjectMetadataProps {
  client?: string;
  metric?: string;
  category?: string;
  date?: string;
  tags?: string[];
}

export function ProjectMetadata({ client, metric, category, date, tags }: ProjectMetadataProps) {
  return (
    <div className="mb-8 p-4 bg-muted rounded-lg">
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {client && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Client</dt>
            <dd className="text-lg">{client}</dd>
          </div>
        )}
        {metric && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Key Metric</dt>
            <dd className="text-lg">{metric}</dd>
          </div>
        )}
        {category && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Category</dt>
            <dd className="text-lg">{category}</dd>
          </div>
        )}
        {date && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Date</dt>
            <dd className="text-lg">{date}</dd>
          </div>
        )}
      </dl>
      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-sm bg-background rounded-md">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

```

## **6. MDX Components**

### **Custom Components to Create**

### **ProjectCard Component (`components/mdx/ProjectCard.tsx`)**

```tsx
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  client?: string;
  href: string;
}

export function ProjectCard({ title, description, imageUrl, client, href }: ProjectCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        {client && <p className="text-sm text-muted-foreground mb-2">Client: {client}</p>}
        <p className="text-muted-foreground mb-4">{description}</p>
        <a href={href} className="text-primary hover:underline">View Project →</a>
      </div>
    </div>
  );
}

```

### **Callout Component (`components/mdx/Callout.tsx`)**

```tsx
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children: React.ReactNode;
}

export function Callout({ type = 'info', children }: CalloutProps) {
  return (
    <div className={cn(
      'p-4 rounded-lg border-l-4 my-6',
      {
        'bg-blue-50 border-blue-500 text-blue-900': type === 'info',
        'bg-yellow-50 border-yellow-500 text-yellow-900': type === 'warning',
        'bg-red-50 border-red-500 text-red-900': type === 'error',
        'bg-green-50 border-green-500 text-green-900': type === 'success',
      }
    )}>
      {children}
    </div>
  );
}

```

### **Additional MDX Components**

Create additional components in `/components/mdx/` as needed:

### **CodeBlock Component (`components/mdx/CodeBlock.tsx`)**

```tsx
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string;
  filename?: string;
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
  return (
    <div className="my-6">
      {filename && (
        <div className="bg-muted border border-b-0 rounded-t-lg px-4 py-2 text-sm text-muted-foreground">
          {filename}
        </div>
      )}
      <pre className={cn(
        "overflow-x-auto border rounded-lg bg-muted p-4",
        filename && "rounded-t-none"
      )}>
        <code className={language ? `language-${language}` : ''}>
          {children}
        </code>
      </pre>
    </div>
  );
}

```

### **ImageGallery Component (`components/mdx/ImageGallery.tsx`)**

```tsx
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  columns?: 2 | 3 | 4;
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  return (
    <div className={cn(
      "grid gap-4 my-6",
      {
        "grid-cols-2": columns === 2,
        "grid-cols-3": columns === 3,
        "grid-cols-4": columns === 4,
      }
    )}>
      {images.map((image, index) => (
        <div key={index} className="space-y-2">
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={300}
            className="rounded-lg object-cover w-full h-48"
          />
          {image.caption && (
            <p className="text-sm text-muted-foreground text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

```

### **TableOfContents Component (`components/mdx/TableOfContents.tsx`)**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = document.querySelectorAll('h2, h3, h4');
    const tocItems: TocItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-8 space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        Table of Contents
      </h3>
      <ul className="space-y-1 text-sm">
        {toc.map((item) => (
          <li
            key={item.id}
            className={cn(
              "border-l-2 pl-3 transition-colors",
              {
                "ml-2": item.level === 3,
                "ml-4": item.level === 4,
                "border-primary text-primary": activeId === item.id,
                "border-muted text-muted-foreground hover:text-foreground": activeId !== item.id,
              }
            )}
          >
            <a href={`#${item.id}`} className="block hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

```

### **Component Registry Setup**

Update `mdx-components.tsx` to include all custom components:

```tsx
import type { MDXComponents } from 'mdx/types';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
// Import custom MDX componentsimport { ProjectCard } from '@/components/mdx/ProjectCard';
import { ProjectMetadata } from '@/components/mdx/ProjectMetadata';
import { Callout } from '@/components/mdx/Callout';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { ImageGallery } from '@/components/mdx/ImageGallery';
import { TableOfContents } from '@/components/mdx/TableOfContents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
// Override default elementsh1: ({ children, ...props }) => (
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
        {children}
      </h2>
    ),
// ... other element overrides// Custom componentsButton,
    ProjectCard,
    ProjectMetadata,
    Callout,
    CodeBlock,
    ImageGallery,
    TableOfContents,
    ...components,
  };
}

```

## **7. Content Migration**

### **Metadata Export Pattern (for Native MDX)**

When using native MDX files in the app directory:

```tsx
// In your .mdx fileexport const metadata = {
  title: 'Project Title',
  description: 'Brief description for SEO and previews',
  openGraph: {
    title: 'Project Title',
    description: 'Brief description',
    images: ['/images/project-hero.jpg'],
  },
};

export const projectInfo = {
  client: 'Client Name',
  metric: '40% improvement',
  category: 'web-application',
  tags: ['web-development', 'react', 'design'],
  date: '2025-01-15',
  featured: true,
};

```

### **Frontmatter Pattern (for Content Directory MDX)**

When storing MDX in a content directory:

```yaml
---
title: "Project Title"
description: "Brief description for SEO and previews"
type: "project"# "project", "blog", or "page"category: "web-application"
client: "Client Name"
metric: "Key metric or achievement"
imageUrl: "/images/project-hero.jpg"
date: "2025-01-15"
tags: ["web-development", "react", "design"]
published: true
featured: false
---

```

### **Example: Native MDX Page**

`app/projects/fmglobal/page.mdx`:

```
import { ProjectMetadata } from '@/components/mdx/ProjectMetadata'
import { Callout } from '@/components/mdx/Callout'
import { ProjectCard } from '@/components/mdx/ProjectCard'

export const metadata = {
  title: 'FM Global Production Flow Optimization',
  description: 'Streamlined production workflow reducing processing time by 40%',
  openGraph: {
    title: 'FM Global Production Flow Optimization',
    description: 'Streamlined production workflow reducing processing time by 40%',
    images: ['/images/fmglobal-hero.jpg'],
  },
};

# FM Global Production Flow Optimization

<ProjectMetadata
  client="FM Global"
  metric="40% faster processing"
  category="process-improvement"
  date="2024-12-15"
  tags={["process-optimization", "workflow", "analytics"]}
/>

This project involved optimizing FM Global's production flow diagram process...

<Callout type="success">
  This optimization resulted in a 40% reduction in processing time.
</Callout>

## Challenge

The existing workflow had several bottlenecks...

## Solution

We implemented a streamlined approach using:

```javascript
// Example code block
const optimizedFlow = {
  steps: ['analyze', 'optimize', 'implement'],
  timeReduction: '40%'
};

```

## **Results**

The implementation delivered measurable improvements across all key metrics.

```

## 8. Testing & Validation

### Verification Steps
1. **Native MDX Rendering**: Create a `.mdx` page in the app directory and verify it renders
2. **Metadata Export**: Verify that exported metadata is properly used for SEO
3. **Component Integration**: Test custom MDX components render correctly
4. **Typography Styles**: Confirm prose classes apply correctly with Tailwind v4
5. **Dynamic Imports**: Test dynamic MDX imports for programmatic content
6. **Build Performance**: Verify MDX compilation doesn't impact build times

### Common Issues and Solutions

#### Issue: MDX page not rendering
**Solution**: Ensure file extension is `.mdx` and `pageExtensions` includes 'mdx' in `next.config.ts`

#### Issue: Components not available in MDX
**Solution**: Check `mdx-components.tsx` is in the project root and properly exports `useMDXComponents`

#### Issue: Metadata not working
**Solution**: Use named export `export const metadata = {}` in MDX files, not frontmatter

#### Issue: Typography styles not applying
**Solution**: Verify `@plugin "@tailwindcss/typography"` is added to `globals.css`

#### Issue: Dynamic imports failing
**Solution**: Ensure MDX files exist in the expected path and use proper error handling

### Performance Considerations
- Use `next/image` for optimized image loading in MDX
- Implement proper code splitting for large content
- Consider static generation for better performance
- Use dynamic imports for heavy MDX components

## 9. Best Practices

### MDX Authoring Guidelines
1. **Consistent Frontmatter**: Use standardized frontmatter schema
2. **Component Usage**: Leverage custom components for enhanced functionality
3. **Image Optimization**: Always use optimized images with proper alt text
4. **Semantic HTML**: Use proper heading hierarchy (H1 → H2 → H3)
5. **Accessibility**: Ensure all interactive elements are accessible

### Performance Optimization Tips
1. **Static Generation**: Use `generateStaticParams` for known routes
2. **Image Optimization**: Implement responsive images with `next/image`
3. **Code Splitting**: Lazy load heavy MDX components
4. **Bundle Analysis**: Monitor bundle size impact of MDX setup
5. **Caching**: Implement proper caching strategies for content

### SEO Considerations
1. **Meta Tags**: Generate proper Open Graph and Twitter Card meta tags
2. **Structured Data**: Consider adding JSON-LD structured data
3. **URL Structure**: Use SEO-friendly slugs and URL patterns
4. **Sitemap**: Include MDX pages in sitemap generation
5. **Loading Speed**: Optimize for Core Web Vitals

## 10. Next Steps

### Priority Tasks (Week 1)
1. ✅ Install @next/mdx and configure Next.js for native MDX support
2. ✅ Create mdx-components.tsx with typography-aware components
3. ✅ Set up Tailwind CSS v4 Typography plugin
4. ✅ Create first MDX page in app directory
5. ✅ Test metadata exports and SEO generation

### Medium Priority (Week 2-3)
1. Create custom MDX components (ProjectCard, Callout, etc.)
2. Migrate existing content to MDX pages
3. Add syntax highlighting with rehype-highlight
4. Implement dynamic MDX routing for programmatic content
5. Set up content utility functions for listing/filtering
6. Add remote MDX support for CMS integration (if needed)

### Optional Enhancements (Future)
1. **Content Management**: Integrate with a headless CMS if needed
2. **Search**: Implement full-text search across MDX content
3. **Analytics**: Track content engagement and reading patterns
4. **Comments**: Add comment system for blog posts
5. **RSS Feed**: Generate RSS feed from MDX content
6. **Content Validation**: Implement automated content validation
7. **Preview Mode**: Add draft/preview functionality for unpublished content

### Future Considerations
- **Content Collaboration**: Multi-author workflow if team grows
- **Internationalization**: Multi-language content support
- **Advanced Components**: Interactive components like charts, animations
- **Performance Monitoring**: Track and optimize content loading performance
- **Content Migration**: Tools for bulk content updates and migrations

---

This implementation plan provides a comprehensive roadmap for integrating MDX into your portfolio project while leveraging the existing Next.js, Tailwind CSS, and shadcn/ui foundation. The plan prioritizes immediate functionality while providing a clear path for future enhancements.
```