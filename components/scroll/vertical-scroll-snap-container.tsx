"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

interface Section {
  title: string;
  id: string;
  children: ReactNode;
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

  const scrollToSection = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const sectionHeight = window.innerHeight;
    container.scrollTo({ top: sectionHeight * index, behavior: "smooth" });
  };

  return (
    <div className={`relative h-[100dvh] ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={`overflow-y-auto snap-y snap-mandatory h-[100dvh] ${className}`}
      >
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="snap-start h-[100dvh] flex items-center justify-center"
          >
            {section.children}
          </section>
        ))}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl">
        <ul className="flex flex-row justify-center items-center w-full px-4 py-3 gap-8">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(index)}
                className="mix-blend-difference text-base"
                type="button"
                aria-label={`Scroll to ${section.title}`}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
