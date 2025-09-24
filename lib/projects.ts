import fs from "node:fs";
import path from "node:path";

export type ProjectSummary = {
  slug: string;
  title?: string;
  description?: string;
  client: string;
  category?: string;
  metric: string;
  date?: string;
  tags?: string[];
  illustrationUrl?: string;
  tabletIllustrationUrl?: string;
  mobileIllustrationUrl?: string;
  href: string;
};

const PROJECTS_DIR = path.join(process.cwd(), "app", "projects");
const PROJECT_ORDER_FILE = path.join(
  process.cwd(),
  "../app/projects/project-order.json",
);

function safeEvalObjectLiteral<T = unknown>(objectLiteral: string): T | null {
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`"use strict"; return (${objectLiteral});`);
    return fn() as T;
  } catch {
    return null;
  }
}

export async function getAllProjectSummaries(): Promise<ProjectSummary[]> {
  const summaries: ProjectSummary[] = [];

  if (!fs.existsSync(PROJECTS_DIR)) return summaries;

  const entries = fs.readdirSync(PROJECTS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const slug = entry.name;
    const mdxPath = path.join(PROJECTS_DIR, slug, "page.mdx");
    if (!fs.existsSync(mdxPath)) continue;

    const content = fs.readFileSync(mdxPath, "utf8");

    // Match: export const metadata = { ... }; or export const metadata = { ... }
    const match = content.match(
      /export\s+const\s+metadata\s*=\s*({[\s\S]*?})\s*;?/,
    );

    let meta: Partial<ProjectSummary> | null = null;
    if (match?.[1]) {
      meta = safeEvalObjectLiteral(match[1]);
    }

    const client = meta?.client ?? slug;
    const metric = meta?.metric ?? "";

    const summary: ProjectSummary = {
      slug,
      title: meta?.title,
      description: meta?.description,
      client,
      category: meta?.category,
      metric,
      date: meta?.date,
      tags: meta?.tags ?? [],
      illustrationUrl: meta?.illustrationUrl,
      tabletIllustrationUrl: meta?.tabletIllustrationUrl,
      mobileIllustrationUrl: meta?.mobileIllustrationUrl,
      href: `/projects/${slug}`,
    };

    summaries.push(summary);
  }

  // Load custom order configuration
  let customOrder: string[] = [];
  try {
    if (fs.existsSync(PROJECT_ORDER_FILE)) {
      const orderConfig = JSON.parse(
        fs.readFileSync(PROJECT_ORDER_FILE, "utf8"),
      );
      customOrder = orderConfig.order || [];
    }
  } catch (error) {
    console.warn("Failed to load project order configuration:", error);
  }

  // Sort by custom order if available, otherwise by date
  if (customOrder.length > 0) {
    summaries.sort((a, b) => {
      const aIndex = customOrder.indexOf(a.slug);
      const bIndex = customOrder.indexOf(b.slug);

      // If both have custom order positions, sort by those
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      // If only one has a custom order position, prioritize it
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      // If neither has a custom order, fall back to date sorting
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  } else {
    // Default date-based sorting when no custom order is configured
    summaries.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0;
      const db = b.date ? new Date(b.date).getTime() : 0;
      return db - da;
    });
  }

  return summaries;
}
