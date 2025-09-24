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
        "flex-shrink-0 snap-center w-[80vw] md:w-[72vw] lg:w-[82vw] h-full pt-[8dvh] pb-[16dvh] md:pt-[8dvh] md:pb-36",
      )}
      ref={ref}
    >
      <motion.div
        className={cn(
          "size-full flex flex-col justify-center items-center text-gray-800 font-semibold rounded-[4rem] transition-all duration-300 relative overflow-hidden",
          className,
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
        <div className="relative z-10 flex flex-col justify-center items-center gap-4 p-8 md:p-12 max-w-4xl">
          {/* Title with responsive clamp sizing */}
          <motion.h2
            className="font-serif text-[clamp(2.5rem,calc(2rem+4vw),6rem)] leading-tight text-center font-light"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {title || client}
          </motion.h2>

          {/* Client, Category, and Date - only show if we have a separate title */}
          {title && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[clamp(1.25rem,calc(1rem+1.5vw),2rem)]"
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <span className="font-sans font-medium">{client}</span>
              {category && (
                <>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span className="font-mono opacity-80">{category}</span>
                </>
              )}
              {date && (
                <>
                  <span className="hidden sm:inline opacity-50">•</span>
                  <span className="font-mono opacity-80">{date}</span>
                </>
              )}
            </motion.div>
          )}

          {/* Category and Date only - when no separate title */}
          {!title && (category || date) && (
            <motion.div
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-[clamp(1.25rem,calc(1rem+1.5vw),2rem)]"
              variants={titleVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {category && (
                <span className="font-mono opacity-80">{category}</span>
              )}
              {date && category && (
                <span className="hidden sm:inline opacity-50">•</span>
              )}
              {date && <span className="font-mono opacity-80">{date}</span>}
            </motion.div>
          )}

          {/* Metric with responsive sizing */}
          <motion.div
            className="font-mono text-[clamp(2rem,calc(1.5rem+2.5vw),4rem)] font-semibold"
            variants={metricVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {metric}
          </motion.div>

          {/* Tags/Skills badges */}
          {tags.length > 0 && (
            <motion.div
              variants={metricVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-2"
            >
              <BadgeGroup
                tags={tags}
                size="sm"
                variant="outline"
                maxVisible={5}
                className="justify-center"
              />
            </motion.div>
          )}

          {/* Optional description */}
          {description && (
            <motion.p
              className="font-sans text-[clamp(0.875rem,calc(0.75rem+0.5vw),1rem)] text-center  max-w-2xl"
              variants={metricVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {description}
            </motion.p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
