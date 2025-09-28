"use client";

import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "../home/connect-icons";
import { Button } from "../ui/button";

interface Section {
  title: string;
  id: string;
  children: ReactNode;
  foregroundColor?: string;
  backgroundClass?: string;
}

interface VerticalScrollSnapContainerProps {
  sections: Section[];
  className?: string;
  containerClassName?: string;
  onHorizontalScroll?: (index: number) => void;
}

export function VerticalScrollSnapContainer({
  sections,
  className = "",
  containerClassName = "",
  onHorizontalScroll,
}: VerticalScrollSnapContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const rafPending = useRef<number | null>(null);

  const scrollToSection = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sectionHeight = container.clientHeight || window.innerHeight;
    container.scrollTo({
      top: sectionHeight * index,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Disable scroll restoration and force to top
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top immediately and aggressively
    const forceScrollToTop = () => {
      container.scrollTop = 0;
      setCurrentSectionIndex(0);
    };

    forceScrollToTop();

    // Use multiple strategies to ensure we stay at top
    const timeouts = [
      setTimeout(forceScrollToTop, 50),
      setTimeout(() => {
        forceScrollToTop();
        setIsInitialized(true);
      }, 100),
      setTimeout(forceScrollToTop, 200),
    ];

    const onScroll = () => {
      if (!scrollRef.current) return;
      if (rafPending.current !== null) return;
      rafPending.current = window.requestAnimationFrame(() => {
        rafPending.current = null;
        const el = scrollRef.current;
        if (!el) return;
        const scrollPosition = el.scrollTop;
        const sectionHeight = el.clientHeight || window.innerHeight;
        const newIndex = Math.floor(scrollPosition / sectionHeight + 0.5);
        const clampedIndex = Math.max(
          0,
          Math.min(newIndex, sections.length - 1),
        );
        setCurrentSectionIndex(clampedIndex);
      });
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      timeouts.forEach(clearTimeout);
      container.removeEventListener("scroll", onScroll);
      if (rafPending.current !== null) {
        window.cancelAnimationFrame(rafPending.current);
        rafPending.current = null;
      }
    };
  }, [sections.length]);

  const handleHorizontalScroll = useCallback(
    (index: number) => {
      onHorizontalScroll?.(index);
    },
    [onHorizontalScroll],
  );

  return (
    <div className={`relative h-[100dvh] ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={[
          "overflow-y-auto snap-y snap-mandatory h-[100dvh] transition-opacity duration-300 relative z-20",
          !isInitialized && "opacity-0",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {sections.map((section, index) => {
          const defaultBg = [
            "gradient-bg",
            "gradient-bg-warm",
            "gradient-bg-chrome",
            "gradient-bg-electric",
            "gradient-bg-ocean",
            "gradient-bg-aurora",
            "gradient-bg-cosmic",
          ][index % 7];
          const bgClass = section.backgroundClass || defaultBg || "";

          return (
            <section
              key={section.id}
              id={section.id}
              className={[
                "snap-start h-[100dvh] flex items-center justify-center relative z-30",
                bgClass,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {React.isValidElement(section.children)
                ? React.cloneElement(
                    section.children as React.ReactElement<{
                      onHorizontalScroll?: (index: number) => void;
                      showVideo?: boolean;
                    }>,
                    {
                      onHorizontalScroll: handleHorizontalScroll,
                      ...(index === 1 &&
                        currentSectionIndex === 1 && { showVideo: true }),
                    },
                  )
                : section.children}
            </section>
          );
        })}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/10">
        <div className="flex flex-row justify-center items-center w-full md:w-auto px-4 py-4 gap-2 overflow-x-auto">
          {sections.map((section, index) => {
            const currentSection = sections[currentSectionIndex];
            const navColor = currentSection?.foregroundColor || "#ffffff";
            const isActive = currentSectionIndex === index;

            return (
              <Button
                key={section.id}
                onClick={() => scrollToSection(index)}
                variant="outline"
                size="sm"
                className="transition-all duration-300 cursor-pointer font-semibold text-sm md:text-lg"
                style={{
                  color: navColor,
                  borderColor: isActive ? navColor : "transparent",
                  backgroundColor: isActive ? `${navColor}20` : "transparent",
                }}
                type="button"
                aria-label={`Scroll to ${section.title}`}
                aria-current={isActive ? "page" : undefined}
              >
                {section.title}
              </Button>
            );
          })}
          <div className="hidden md:flex items-center gap-3 ml-8">
            <a
              href="https://www.linkedin.com/messaging/compose/?recipient=mattwoodco"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:cursor-pointer"
              aria-label="LinkedIn"
              style={{
                color:
                  sections[currentSectionIndex]?.foregroundColor || "#ffffff",
              }}
            >
              <LinkedInIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="mailto:hello@mattwood.co?subject=Hello%20from%20mattwood.co&body=Hi%20Matt,%0A%0AI%20found%20your%20portfolio%20and%20would%20love%20to%20connect!%0A%0A"
              className="transition-colors hover:cursor-pointer"
              aria-label="Email"
              style={{
                color:
                  sections[currentSectionIndex]?.foregroundColor || "#ffffff",
              }}
            >
              <EmailIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://x.com/messages/compose?recipient_id=mattwoodco"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:cursor-pointer"
              aria-label="Message on X"
              style={{
                color:
                  sections[currentSectionIndex]?.foregroundColor || "#ffffff",
              }}
            >
              <XIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://github.com/mattwoodco"
              className="transition-colors hover:cursor-pointer"
              aria-label="GitHub"
              style={{
                color:
                  sections[currentSectionIndex]?.foregroundColor || "#ffffff",
              }}
            >
              <GitHubIcon className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
