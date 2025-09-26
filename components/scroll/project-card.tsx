import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BadgeGroup } from "@/components/ui/badge";
import {
  type AnimationDirection,
  useProjectCardAnimation,
} from "@/hooks/use-project-card-animation";
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
  illustrationUrl = "https://placehold.co/600x400",
  tabletIllustrationUrl = "https://placehold.co/400x300",
  mobileIllustrationUrl = "https://placehold.co/200x150",
  animationDirection = "right",
  animationDelay = 0.1,
  className,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const { containerVariants, titleVariants, metricVariants } =
    useProjectCardAnimation({
      direction: animationDirection,
      delay: animationDelay,
    });

  // Default to main illustration if responsive versions aren't provided
  const mobileImage = mobileIllustrationUrl || illustrationUrl;
  const tabletImage = tabletIllustrationUrl || illustrationUrl;

  return (
    <div
      className={cn(
        "flex-shrink-0 snap-center w-[80vw] md:w-[72vw] lg:w-[82vw] h-full pt-[10dvh] pb-[16dvh] md:pt-[8dvh] md:pb-36",
      )}
      ref={ref}
    >
      <motion.div
        className={cn(
          "size-full flex flex-col justify-center items-center text-gray-800 font-semibold rounded-[4rem] transition-all duration-300 relative overflow-hidden",
          // Liquid glass gradient border on mobile only
          "md:bg-black md:border-0",
          "bg-gradient-to-br from-white/30 via-purple-500/20 to-blue-500/30 p-[2px]",
          className,
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="size-full rounded-[4rem] bg-black relative overflow-hidden">
          {/* Background images with responsive sources */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 md:hidden"
            style={{
              backgroundImage: `url(${mobileImage})`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 hidden md:block lg:hidden"
            style={{
              backgroundImage: `url(${tabletImage})`,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 hidden lg:block"
            style={{
              backgroundImage: `url(${illustrationUrl})`,
            }}
          />

          {/* Content overlay */}
          <div className="relative z-10 flex flex-col h-full w-full">
            {/* Main content group - flex-1 */}
            <div className="flex-1 flex flex-col justify-start md:justify-center items-center gap-6 w-full p-8 md:p-12 pb-0">
              {/* Title with responsive clamp sizing */}
              <motion.h2
                className="font-serif text-[clamp(1.25rem,calc(1rem+2vw),2rem)] md:text-[clamp(2.5rem,calc(2rem+4vw),6rem)] leading-none text-center font-light text-white"
                variants={titleVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {client || title}
              </motion.h2>

              {/* Metric with responsive sizing */}
              <motion.div
                className="font-serif text-2xl md:text-[clamp(2rem,calc(1.5rem+2.5vw),4rem)] font-light leading-none italic text-white text-center"
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
                  <p className="font-sans font-normal text-[clamp(0.625rem,calc(0.55rem+0.5vw),0.75rem)] md:text-[clamp(0.875rem,calc(0.75rem+0.5vw),1rem)]">
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
            <div className="flex flex-col items-center gap-4 w-full px-8 pb-12 md:p-12 flex-grow-0">
              {/* Tags/Skills badges */}
              {tags.length > 0 && (
                <motion.div
                  variants={metricVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <BadgeGroup
                    tags={tags.map((tag) => tag.toUpperCase())}
                    size="sm"
                    variant="solid"
                    maxVisible={5}
                    className="justify-center"
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
