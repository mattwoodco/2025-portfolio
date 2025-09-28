import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import type { AnimationDirection } from "@/hooks/use-project-card-animation";
import { useProjectCardAnimation } from "@/hooks/use-project-card-animation";
import { cn } from "@/lib/utils";

export interface ProjectCardProps {
  title?: string;
  description?: string;
  client: string;
  category?: string;
  date?: string;
  tags?: string[];
  metric: string;
  illustrationUrl: string;
  mobileIllustrationUrl?: string;
  tabletIllustrationUrl?: string;
  animationDirection?: AnimationDirection;
  animationDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ProjectCard({
  title,
  description,
  client,
  category,
  date,
  tags = [],
  metric,
  // illustrationUrl = "https://placehold.co/600x400",
  // tabletIllustrationUrl = "https://placehold.co/400x300",
  // mobileIllustrationUrl = "https://placehold.co/200x150",
  animationDirection = "right",
  animationDelay = 0.1,
  className,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const { containerVariants, titleVariants, metricVariants, tagVariants } =
    useProjectCardAnimation({
      direction: animationDirection,
      delay: animationDelay,
    });

  return (
    <div
      className={cn(
        "flex-shrink-0 snap-center w-[80vw] md:w-[72vw] lg:w-[82vw] h-full pt-[10dvh] pb-[16dvh] md:pt-[8dvh] md:pb-36",
      )}
      ref={ref}
    >
      <motion.div
        className={cn(
          "size-full flex flex-col justify-center items-center text-gray-800 font-semibold rounded-[4rem] md:rounded-[8rem] transition-all duration-300 relative overflow-hidden",
          // Liquid glass gradient border with shimmer animation
          "bg-gradient-to-br from-purple-300/30 via-purple-500/25 to-purple-700/30 p-[1px]",
          "project-card-shimmer",
          className,
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="size-full rounded-[4rem] md:rounded-[8rem] bg-black relative overflow-hidden">
          {/* Content overlay */}
          <div className="relative z-10 flex flex-col h-full w-full">
            {/* Main content group - flex-1 */}
            <div className="flex-1 flex flex-col justify-start md:justify-center items-center gap-6 md:gap-10 w-full p-8 md:p-[4.2rem] pb-0 pt-16 md:pt-[5.292rem]">
              {/* Title with responsive clamp sizing */}
              <motion.h2
                className="font-serif text-[clamp(1.25rem,calc(1rem+2vw),2.25rem)] md:text-[clamp(1.18125rem,calc(0.91875rem+1.8375vw),2.8875rem)] leading-none text-center font-light text-white"
                variants={titleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {client || title}
              </motion.h2>

              {/* Metric with responsive sizing */}
              <motion.div
                className="font-serif text-[clamp(1.75rem,calc(1.5rem+1.5vw),2.5rem)] md:text-[clamp(2rem,calc(1.5rem+2.5vw),4rem)] font-light leading-none italic text-white text-center"
                variants={metricVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {metric}
              </motion.div>

              {/* Optional description */}
              {description && (
                <motion.div
                  className="max-w-2xl text-left text-white"
                  variants={titleVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <p className="font-sans font-normal text-[clamp(0.75rem,calc(0.65rem+0.75vw),0.875rem)] md:text-[clamp(1rem,calc(0.85rem+0.775vw),1.325rem)]">
                    {description}
                  </p>

                  {/* Category and Date - hidden on mobile */}
                  {(category || date) && (
                    <p className="font-sans font-normal text-base md:text-[clamp(0.875rem,calc(0.75rem+0.5vw),1rem)] text-left text-white max-w-2xl mt-4 hidden md:block">
                      {category && date
                        ? `${date} / ${category}`
                        : date || category}
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Bottom group - tags */}
            <div className="flex flex-col items-center gap-4 w-full px-8 pb-12 md:px-[4.2rem] md:pt-4 md:pb-[5.6rem] flex-grow-0">
              {/* Tags/Skills badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 md:gap-4 justify-center">
                  {tags.slice(0, 5).map((tag, _index) => (
                    <motion.div key={tag} variants={tagVariants}>
                      <div className="inline-flex items-center rounded-full border font-mono font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-white/20 text-white hover:bg-white/30 px-2 py-0.5 !text-[0.55rem] md:!text-[0.9rem] md:px-6 md:py-1.5">
                        {tag.toUpperCase()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
