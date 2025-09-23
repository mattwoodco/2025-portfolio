"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface Section {
  title: string;
  id: string;
  children: ReactNode;
  foregroundColor?: string;
}

interface VerticalScrollSnapContainerProps {
  sections: Section[];
  className?: string;
  containerClassName?: string;
}

export function VerticalScrollSnapContainer({
  sections,
  className = "",
  containerClassName = "",
}: VerticalScrollSnapContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const scrollToSection = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const sectionHeight = window.innerHeight;
    container.scrollTo({ top: sectionHeight * index, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const scrollPosition = container.scrollTop;
      const sectionHeight = window.innerHeight;
      const newIndex = Math.round(scrollPosition / sectionHeight);
      setCurrentSectionIndex(newIndex);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={`relative h-[100dvh] ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={`overflow-y-auto snap-y snap-mandatory h-[100dvh] ${className}`}
      >
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`snap-start h-[100dvh] flex items-center justify-center ${
              index === 0
                ? "gradient-bg"
                : index === 1
                  ? "bg-black"
                  : index === 2
                    ? "gradient-bg-warm"
                    : ""
            }`}
          >
            {section.children}
          </section>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/10">
        <div className="flex flex-row justify-center items-center w-full px-4 py-4 gap-2">
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
                className="transition-all duration-300 cursor-pointer"
                style={{
                  color: navColor,
                  borderColor: isActive ? navColor : "transparent",
                  backgroundColor: isActive ? `${navColor}20` : "transparent",
                }}
                type="button"
                aria-label={`Scroll to ${section.title}`}
              >
                {section.title}
              </Button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
