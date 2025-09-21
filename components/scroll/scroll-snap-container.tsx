"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

interface ScrollSnapContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  cardWidth?: string;
  cardGap?: string;
  cardMarginLeft?: string;
}

export function ScrollSnapContainer({
  children,
  className = "",
  containerClassName = "",
  cardWidth = "80dvw",
  cardGap = "40dvw",
}: ScrollSnapContainerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToNext = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Calculate scroll amount based on card width + gap
    // Convert dvw values to pixels
    const vw = window.innerWidth / 100;
    const cardWidthPx = parseFloat(cardWidth) * vw;
    const gapPx = parseFloat(cardGap) * vw;
    const scrollAmount = cardWidthPx + gapPx;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollToPrev = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    // Calculate scroll amount based on card width + gap
    // Convert dvw values to pixels
    const vw = window.innerWidth / 100;
    const cardWidthPx = parseFloat(cardWidth) * vw;
    const gapPx = parseFloat(cardGap) * vw;
    const scrollAmount = cardWidthPx + gapPx;

    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div
        ref={scrollRef}
        className={`flex overflow-x-auto snap-x snap-mandatory h-full items-center w-full bg-pink-200 ${className}`}
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
