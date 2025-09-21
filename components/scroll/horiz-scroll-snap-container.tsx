"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

interface ScrollSnapContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function HorizScrollSnapContainer({
  children,
  className = "",
  containerClassName = "",
}: ScrollSnapContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    // Find the first child that's not fully visible on the right
    const containerRect = container.getBoundingClientRect();

    for (const child of children) {
      const childRect = child.getBoundingClientRect();
      // If child starts after current view or is partially visible on right
      if (childRect.left >= containerRect.right - 10 ||
          (childRect.right > containerRect.right && childRect.left < containerRect.right)) {
        child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        return;
      }
    }
  };

  const scrollToPrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    // Find the last child that's not fully visible on the left
    const containerRect = container.getBoundingClientRect();

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      // If child ends before current view or is partially visible on left
      if (childRect.right <= containerRect.left + 10 ||
          (childRect.left < containerRect.left && childRect.right > containerRect.left)) {
        child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        return;
      }
    }
  };

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide ${className} h-full w-full [&>*]:snap-start scroll-smooth`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>

      <button
        onClick={scrollToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
        aria-label="Previous"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Previous</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={scrollToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
        aria-label="Next"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <title>Next</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
