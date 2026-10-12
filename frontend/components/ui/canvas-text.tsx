"use client";
import React, { useState, useRef } from "react";

interface CanvasTextProps {
  text?: string;
  className?: string;
  strokeWidth?: string;
}

export function CanvasText({
  text = "How old are you?",
  className = "",
  strokeWidth = "0.4"
}: CanvasTextProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 240"
        className="w-full max-h-[260px] overflow-visible"
      >
        <defs>
          <radialGradient
            id="canvasTextGradient"
            gradientUnits="userSpaceOnUse"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            r="35%"
          >
            <stop offset="0%" stopColor="#ff5277" stopOpacity="1" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
          </radialGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <mask id="canvasTextMask">
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-black text-6xl md:text-8xl uppercase tracking-wider fill-white stroke-white"
              strokeWidth={strokeWidth}
            >
              {text}
            </text>
          </mask>
        </defs>

        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black text-6xl md:text-8xl uppercase tracking-wider fill-transparent stroke-purple-400/30"
          strokeWidth="1.2"
        >
          {text}
        </text>

        <text
          x="50%"
          y="55%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="font-black text-6xl md:text-8xl uppercase tracking-wider fill-transparent stroke-pink-500 transition-opacity duration-300"
          strokeWidth="0.8"
          style={{ opacity: hovered ? 0.7 : 0.2 }}
        >
          {text}
        </text>

        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#canvasTextGradient)"
          mask="url(#canvasTextMask)"
          style={{ opacity: hovered ? 1 : 0.65, transition: "opacity 0.3s ease" }}
        />

        {hovered && (
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-black text-6xl md:text-8xl uppercase tracking-wider"
            fill="url(#canvasTextGradient)"
            filter="url(#glowEffect)"
            opacity="0.5"
            pointerEvents="none"
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
}
export default CanvasText;
