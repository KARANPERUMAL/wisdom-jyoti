import React, { useState, useEffect } from "react";

export function HoverBorderGradient({
  children,
  containerClassName = "",
  className = "",
  as: Tag = "div",
  duration = 1.2,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(25% 50% at 50% 0%, #ffe343 0%, rgba(255, 227, 67, 0) 100%)",
    LEFT: "radial-gradient(25% 50% at 0% 50%, #ff5277 0%, rgba(255, 82, 119, 0) 100%)",
    BOTTOM: "radial-gradient(25% 50% at 50% 100%, #7c3aed 0%, rgba(124, 58, 237, 0) 100%)",
    RIGHT: "radial-gradient(25% 50% at 100% 50%, #ffe343 0%, rgba(255, 227, 67, 0) 100%)",
  };

  const highlight =
    "radial-gradient(80% 180% at 50% 50%, #ffe343 0%, rgba(255, 82, 119, 0.4) 50%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`hover-border-gradient-container ${containerClassName}`}
      {...props}
    >
      <div className={`hover-border-gradient-content ${className}`}>
        {children}
      </div>
      <div
        className="hover-border-gradient-glow"
        style={{
          background: hovered ? highlight : movingMap[direction],
          transition: "background 0.4s ease",
        }}
      />
    </Tag>
  );
}

export default HoverBorderGradient;
