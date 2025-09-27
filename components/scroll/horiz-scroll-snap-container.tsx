"use client";

import type { ReactNode } from "react";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

import type { AnimationDirection } from "@/hooks/use-project-card-animation";
import type { ProjectCardProps } from "./project-card";

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
  const [scrollDirection, setScrollDirection] =
    useState<AnimationDirection>("right");
  const lastScrollPos = useRef(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scrollToNext = () => {
    if (!scrollRef.current) return;
    setScrollDirection("right");
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    // Find the first child that's not fully visible on the right
    const containerRect = container.getBoundingClientRect();

    for (const child of children) {
      const childRect = child.getBoundingClientRect();
      // If child starts after current view or is partially visible on right
      if (
        childRect.left >= containerRect.right - 10 ||
        (childRect.right > containerRect.right &&
          childRect.left < containerRect.right)
      ) {
        child.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
        return;
      }
    }
  };

  const scrollToPrev = () => {
    if (!scrollRef.current) return;
    setScrollDirection("left");
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];

    // Find the last child that's not fully visible on the left
    const containerRect = container.getBoundingClientRect();

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      // If child ends before current view or is partially visible on left
      if (
        childRect.right <= containerRect.left + 10 ||
        (childRect.left < containerRect.left &&
          childRect.right > containerRect.left)
      ) {
        child.scrollIntoView({
          behavior: "smooth",
          inline: "start",
          block: "nearest",
        });
        return;
      }
    }
  };

  // Detect scroll direction from touch/mouse swipes
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateAtStart = () => {
      const currentScrollPos = container.scrollLeft;

      if (currentScrollPos > lastScrollPos.current) {
        setScrollDirection("right");
      } else if (currentScrollPos < lastScrollPos.current) {
        setScrollDirection("left");
      }

      lastScrollPos.current = currentScrollPos;

      // Determine if the first child is aligned at the start of the container's viewport
      const firstChild = container.firstElementChild as HTMLElement | null;
      if (!firstChild) {
        setIsAtStart(true);
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const paddingLeft = parseFloat(
        window.getComputedStyle(container).paddingLeft || "0",
      );

      // True start when the first child's left aligns with the container's content start (left + paddingLeft)
      const contentStartLeft = containerRect.left + paddingLeft;
      const children = Array.from(container.children) as HTMLElement[];
      let firstVisibleIndex = -1;
      let lastVisibleIndex = -1;
      const paddingRight = parseFloat(
        window.getComputedStyle(container).paddingRight || "0",
      );
      const contentEndLeft = containerRect.right - paddingRight; // mirror of content start relative to left coords
      for (let i = 0; i < children.length; i++) {
        const rect = children[i].getBoundingClientRect();
        const overlaps =
          rect.left < contentEndLeft - 1 && rect.right > contentStartLeft + 1;
        if (overlaps) {
          if (firstVisibleIndex === -1) firstVisibleIndex = i;
          lastVisibleIndex = i;
        }
      }

      // If the first visible item is the very first child, we're at the start
      setIsAtStart(firstVisibleIndex <= 0);

      // If the last visible item is the last child, we're at the end
      setIsAtEnd(
        lastVisibleIndex >= children.length - 1 && lastVisibleIndex !== -1,
      );
    };

    const handleScroll = () => updateAtStart();
    const handleResize = () => updateAtStart();

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initialize on mount and after a tick to catch layout
    updateAtStart();
    requestAnimationFrame(() => {
      updateAtStart();
      // Force snap to the first child aligned to start on initial load
      const firstChild = container.firstElementChild as HTMLElement | null;
      if (firstChild) {
        firstChild.scrollIntoView({
          behavior: "auto",
          inline: "start",
          block: "nearest",
        });
        // Recompute after snapping
        requestAnimationFrame(updateAtStart);
      }
    });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={`flex gap-12  md:gap-14 lg:gap-16 overflow-x-auto snap-x snap-mandatory scrollbar-hide ${className} h-full w-full px-[12.5vw] md:px-[17.5vw] lg:px-[22.5vw] scroll-smooth`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              animationDirection: scrollDirection,
            } as ProjectCardProps);
          }
          return child;
        })}
      </div>

      <button
        onClick={scrollToPrev}
        className={`absolute left-4 top-[calc(50%-3dvh)] md:top-[calc(50%-0.5dvh)] -translate-y-1/2 z-10 rounded-full p-3 shadow-lg bg-black/20 text-white backdrop-blur-sm transition-opacity duration-300 ${
          isAtStart ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Previous"
        aria-hidden={isAtStart}
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
        className={`absolute right-4 top-[calc(50%-3dvh)] md:top-[calc(50%-0.5dvh)] -translate-y-1/2 z-10 rounded-full p-3 shadow-lg bg-black/20 text-white backdrop-blur-sm transition-opacity duration-300 ${
          isAtEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Next"
        aria-hidden={isAtEnd}
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
