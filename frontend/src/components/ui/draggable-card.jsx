import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

export const DraggableCardBody = ({ children, className, style }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.05 }}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "draggable-card-body cursor-grab active:cursor-grabbing",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const DraggableCardContainer = ({ className, children, style }) => {
  return (
    <div
      className={cn("draggable-card-container", className)}
      style={{ perspective: "3000px", ...style }}
    >
      {children}
    </div>
  );
};
