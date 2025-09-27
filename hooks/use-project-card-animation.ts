import type { Variants } from "framer-motion";

export type AnimationDirection = "left" | "right";

interface UseProjectCardAnimationProps {
  direction?: AnimationDirection;
  delay?: number;
}

export function useProjectCardAnimation({
  direction = "right",
  delay = 0.15,
}: UseProjectCardAnimationProps = {}) {
  // Use screen width-based transforms for consistent visual delta across devices
  const xOffset = direction === "right" ? "-15vw" : "15vw";

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
        delay: 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? "15vw" : "-15vw",
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
        delay: 0.35,
        duration: 0.65,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      x: direction === "right" ? "15vw" : "-15vw",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const tagContainerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        staggerChildren: 0.25,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const tagVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return {
    containerVariants,
    titleVariants,
    metricVariants,
    tagContainerVariants,
    tagVariants,
  };
}
