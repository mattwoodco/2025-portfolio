import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import {
  type AnimationDirection,
  useProjectCardAnimation,
} from "@/hooks/use-project-card-animation";

export interface ProjectCardProps {
  client: string;
  metric: string;
  backgroundColor: string;
  illustrationUrl: string;
  animationDirection?: AnimationDirection;
  animationDelay?: number;
}

export function ProjectCard({
  client,
  metric,
  backgroundColor,
  illustrationUrl = "https://placehold.co/600x400",
  animationDirection = "right",
  animationDelay = 0.1,
}: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const { containerVariants, titleVariants, metricVariants, imageVariants } =
    useProjectCardAnimation({
      direction: animationDirection,
      delay: animationDelay,
    });

  return (
    <div
      className="flex-shrink-0 snap-center w-[72vw] md:w-[72vw] lg:w-[84vw] h-full py-[8dvh] md:py-20"
      ref={ref}
    >
      <motion.div
        className="size-full flex flex-col justify-center items-center text-white font-semibold rounded-3xl md:rounded-[4rem] shadow-xl hover:shadow-2xl transition-all duration-300 "
        style={{ background: backgroundColor }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-2xl"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {client}
        </motion.div>
        <motion.div
          className="text-lg opacity-90"
          variants={metricVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {metric}
        </motion.div>
        <motion.div variants={imageVariants} initial="hidden" animate="visible">
          <Image
            src={illustrationUrl}
            alt={client}
            width={600}
            height={400}
            unoptimized
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
