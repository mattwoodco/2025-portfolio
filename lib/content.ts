import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// TypeScript interfaces
export interface FrontMatter {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  slug?: string;
  image?: string;
  author?: string;
  type?: "blog" | "project" | "case-study" | string;
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
  filePath: string;
}

// Content directory path
const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Get content by slug from a specific directory
 */
export async function getContentBySlug(
  slug: string,
  contentType: string = "blog",
): Promise<ContentItem | null> {
  try {
    const contentTypeDir = path.join(CONTENT_DIR, contentType);
    const filePath = path.join(contentTypeDir, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontMatter, content } = matter(fileContents);

    // Calculate reading time
    const readingTimeStats = readingTime(content);

    return {
      slug,
      frontMatter: {
        ...frontMatter,
        slug,
        type: contentType,
      } as FrontMatter,
      content,
      readingTime: readingTimeStats,
      filePath,
    };
  } catch (error) {
    console.error(`Error reading content for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get all content from a specific directory
 */
export async function getAllContent(
  contentType: string = "blog",
  options: {
    published?: boolean;
    sortBy?: "date" | "title";
    sortOrder?: "asc" | "desc";
  } = {},
): Promise<ContentItem[]> {
  try {
    const { published = true, sortBy = "date", sortOrder = "desc" } = options;
    const contentTypeDir = path.join(CONTENT_DIR, contentType);

    // Check if directory exists
    if (!fs.existsSync(contentTypeDir)) {
      return [];
    }

    const files = fs.readdirSync(contentTypeDir);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const contentItems: ContentItem[] = [];

    for (const file of mdxFiles) {
      const slug = file.replace(".mdx", "");
      const contentItem = await getContentBySlug(slug, contentType);

      if (contentItem) {
        // Filter by published status if specified
        if (published && contentItem.frontMatter.published === false) {
          continue;
        }

        contentItems.push(contentItem);
      }
    }

    // Sort content
    contentItems.sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        const dateA = new Date(a.frontMatter.date || "").getTime();
        const dateB = new Date(b.frontMatter.date || "").getTime();
        comparison = dateA - dateB;
      } else if (sortBy === "title") {
        comparison = a.frontMatter.title.localeCompare(b.frontMatter.title);
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return contentItems;
  } catch (error) {
    console.error(
      `Error reading all content for type "${contentType}":`,
      error,
    );
    return [];
  }
}

/**
 * Get content by type (blog, projects, case-studies, etc.)
 */
export async function getContentByType(
  contentType: string,
  options?: {
    published?: boolean;
    sortBy?: "date" | "title";
    sortOrder?: "asc" | "desc";
    limit?: number;
  },
): Promise<ContentItem[]> {
  const { limit, ...otherOptions } = options || {};
  const content = await getAllContent(contentType, otherOptions);

  return limit ? content.slice(0, limit) : content;
}

/**
 * Get featured content across all content types
 */
export async function getFeaturedContent(
  contentTypes: string[] = ["blog", "projects"],
  limit?: number,
): Promise<ContentItem[]> {
  try {
    const allFeaturedContent: ContentItem[] = [];

    for (const contentType of contentTypes) {
      const content = await getAllContent(contentType, { published: true });
      const featuredContent = content.filter(
        (item) => item.frontMatter.featured === true,
      );
      allFeaturedContent.push(...featuredContent);
    }

    // Sort by date (newest first)
    allFeaturedContent.sort((a, b) => {
      const dateA = new Date(a.frontMatter.date || "").getTime();
      const dateB = new Date(b.frontMatter.date || "").getTime();
      return dateB - dateA;
    });

    return limit ? allFeaturedContent.slice(0, limit) : allFeaturedContent;
  } catch (error) {
    console.error("Error getting featured content:", error);
    return [];
  }
}

/**
 * Get content by category
 */
export async function getContentByCategory(
  category: string,
  contentTypes: string[] = ["blog"],
  options?: {
    published?: boolean;
    sortBy?: "date" | "title";
    sortOrder?: "asc" | "desc";
    limit?: number;
  },
): Promise<ContentItem[]> {
  try {
    const { limit, ...otherOptions } = options || {};
    const allContent: ContentItem[] = [];

    for (const contentType of contentTypes) {
      const content = await getAllContent(contentType, otherOptions);
      const categoryContent = content.filter(
        (item) =>
          item.frontMatter.category?.toLowerCase() === category.toLowerCase(),
      );
      allContent.push(...categoryContent);
    }

    // Sort by date (newest first) if not already sorted
    if (!options?.sortBy) {
      allContent.sort((a, b) => {
        const dateA = new Date(a.frontMatter.date || "").getTime();
        const dateB = new Date(b.frontMatter.date || "").getTime();
        return dateB - dateA;
      });
    }

    return limit ? allContent.slice(0, limit) : allContent;
  } catch (error) {
    console.error(`Error getting content by category "${category}":`, error);
    return [];
  }
}

/**
 * Get content by tags
 */
export async function getContentByTags(
  tags: string[],
  contentTypes: string[] = ["blog"],
  options?: {
    published?: boolean;
    sortBy?: "date" | "title";
    sortOrder?: "asc" | "desc";
    limit?: number;
    matchAll?: boolean; // true = match all tags, false = match any tag
  },
): Promise<ContentItem[]> {
  try {
    const { limit, matchAll = false, ...otherOptions } = options || {};
    const allContent: ContentItem[] = [];

    for (const contentType of contentTypes) {
      const content = await getAllContent(contentType, otherOptions);
      const taggedContent = content.filter((item) => {
        const itemTags = item.frontMatter.tags || [];

        if (matchAll) {
          // Must have all specified tags
          return tags.every((tag) =>
            itemTags.some(
              (itemTag) => itemTag.toLowerCase() === tag.toLowerCase(),
            ),
          );
        } else {
          // Must have at least one of the specified tags
          return tags.some((tag) =>
            itemTags.some(
              (itemTag) => itemTag.toLowerCase() === tag.toLowerCase(),
            ),
          );
        }
      });
      allContent.push(...taggedContent);
    }

    // Sort by date (newest first) if not already sorted
    if (!options?.sortBy) {
      allContent.sort((a, b) => {
        const dateA = new Date(a.frontMatter.date || "").getTime();
        const dateB = new Date(b.frontMatter.date || "").getTime();
        return dateB - dateA;
      });
    }

    return limit ? allContent.slice(0, limit) : allContent;
  } catch (error) {
    console.error(`Error getting content by tags:`, error);
    return [];
  }
}

/**
 * Get all available content types
 */
export function getContentTypes(): string[] {
  try {
    if (!fs.existsSync(CONTENT_DIR)) {
      return [];
    }

    const items = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
    return items.filter((item) => item.isDirectory()).map((item) => item.name);
  } catch (error) {
    console.error("Error getting content types:", error);
    return [];
  }
}

/**
 * Search content by text
 */
export async function searchContent(
  query: string,
  contentTypes: string[] = ["blog"],
  options?: {
    published?: boolean;
    searchFields?: ("title" | "description" | "content" | "tags")[];
    limit?: number;
  },
): Promise<ContentItem[]> {
  try {
    const {
      searchFields = ["title", "description", "content"],
      limit,
      ...otherOptions
    } = options || {};

    const allContent: ContentItem[] = [];
    const searchQuery = query.toLowerCase();

    for (const contentType of contentTypes) {
      const content = await getAllContent(contentType, otherOptions);
      const matchingContent = content.filter((item) => {
        return searchFields.some((field) => {
          switch (field) {
            case "title":
              return item.frontMatter.title
                ?.toLowerCase()
                .includes(searchQuery);
            case "description":
              return item.frontMatter.description
                ?.toLowerCase()
                .includes(searchQuery);
            case "content":
              return item.content.toLowerCase().includes(searchQuery);
            case "tags":
              return item.frontMatter.tags?.some((tag) =>
                tag.toLowerCase().includes(searchQuery),
              );
            default:
              return false;
          }
        });
      });

      allContent.push(...matchingContent);
    }

    // Sort by relevance (exact matches first, then by date)
    allContent.sort((a, b) => {
      const aExactMatch = a.frontMatter.title?.toLowerCase() === searchQuery;
      const bExactMatch = b.frontMatter.title?.toLowerCase() === searchQuery;

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      // If both or neither are exact matches, sort by date
      const dateA = new Date(a.frontMatter.date || "").getTime();
      const dateB = new Date(b.frontMatter.date || "").getTime();
      return dateB - dateA;
    });

    return limit ? allContent.slice(0, limit) : allContent;
  } catch (error) {
    console.error(`Error searching content:`, error);
    return [];
  }
}
