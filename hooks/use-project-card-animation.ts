import { type Variants } from "framer-motion";

export type AnimationDirection = "left" | "right";

interface UseProjectCardAnimationProps {
  direction?: AnimationDirection;
  delay?: number;
}

export function useProjectCardAnimation({
  direction = "right",
  delay = 0.15,
}: UseProjectCardAnimationProps = {}) {
  // Reverse the direction: when scrolling right, text comes from left
  const xOffset = direction === "right" ? -60 : 60;

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: delay * 0.5,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: delay / 2,
        staggerDirection: -1,
      },
    },
  };

  const titleVariants: Variants = {
    hidden: {
      opacity: 0,
      x: xOffset,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -xOffset,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const metricVariants: Variants = {
    hidden: {
      opacity: 0,
      x: xOffset,
    },
    visible: {
      opacity: 0.9,
      x: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: -xOffset,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      x: xOffset * 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.85,
      x: -xOffset * 0.5,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  return {
    containerVariants,
    titleVariants,
    metricVariants,
    imageVariants,
  };
}