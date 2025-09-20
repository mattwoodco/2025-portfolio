import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { Callout } from "@/components/mdx/Callout";
import ProjectCard from "@/components/mdx/ProjectCard";
import { ProjectMetadata } from "@/components/mdx/ProjectMetadata";
import { Button } from "@/components/ui/button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default HTML elements with styled versions
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mb-4 border">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    img: (props) => (
      <Image
        {...props}
        className="rounded-lg shadow-lg mb-4"
        width={800}
        height={400}
        alt={props.alt || ""}
      />
    ),
    a: ({ href, children, ...props }) => {
      // Internal links use Next.js Link
      if (href?.startsWith("/")) {
        return (
          <Link
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {children}
          </Link>
        );
      }
      // External links open in new tab
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Include custom components
    Button,
    ProjectCard,
    ProjectMetadata,
    Callout,
    ...components,
  };
}
