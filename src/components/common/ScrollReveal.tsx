import { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  key?: string | number;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth cubic-bezier cubic Out
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
