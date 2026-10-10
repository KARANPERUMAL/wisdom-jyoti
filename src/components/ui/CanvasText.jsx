import React, { useState, useRef } from "react";

export function CanvasText({
  lines = ["HOW OLD", "ARE YOU?"],
  className = "",
  strokeWidth = "3"
}) {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((e.clientX - rect.left) / rect.width) * 100;
    const cy = ((e.clientY - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
  };

  const lineYPositions = lines.length === 1 ? ["55%"] : ["34%", "80%"];

  return (
    <div
      className={`canvas-text-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none"
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 360"
        className="canvas-text-svg"
        style={{
          width: "100%",
          maxHeight: "420px",
          overflow: "visible"
        }}
      >
        <defs>
          {/* Radial gradient following cursor (focused to cover 1 line at a time) */}
          <radialGradient
            id="canvasTextGradient"
            gradientUnits="userSpaceOnUse"
            cx={maskPosition.cx}
            cy={maskPosition.cy}
            r="20%"
          >
            <stop offset="0%" stopColor="#ffe343" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#ff5277" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>

          {/* Glowing Filter */}
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Mask for text fill revealing */}
          <mask id="canvasTextMask">
            {lines.map((lineText, idx) => (
              <text
                key={idx}
                x="50%"
                y={lineYPositions[idx] || `${(idx + 1) * 40}%`}
                textAnchor="middle"
                dominantBaseline="middle"
                className="canvas-text-font"
                fill="#ffffff"
                stroke="#ffffff"
                strokeWidth={strokeWidth}
              >
                {lineText}
              </text>
            ))}
          </mask>
        </defs>

        {/* ALWAYS VISIBLE Crisp White Outline Text (Visible without hovering) */}
        {lines.map((lineText, idx) => (
          <text
            key={`outline-${idx}`}
            x="50%"
            y={lineYPositions[idx] || `${(idx + 1) * 40}%`}
            textAnchor="middle"
            dominantBaseline="middle"
            className="canvas-text-font"
            fill="rgba(255, 255, 255, 0.08)"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinejoin="round"
            style={{
              opacity: 0.95,
              transition: "all 0.3s ease"
            }}
          >
            {lineText}
          </text>
        ))}

        {/* Secondary subtle gold stroke accent */}
        {lines.map((lineText, idx) => (
          <text
            key={`stroke-${idx}`}
            x="50%"
            y={lineYPositions[idx] || `${(idx + 1) * 40}%`}
            textAnchor="middle"
            dominantBaseline="middle"
            className="canvas-text-font"
            fill="transparent"
            stroke="#ffc966"
            strokeWidth="1.2"
            style={{
              opacity: hovered ? 0.75 : 0.35,
              transition: "opacity 0.3s ease"
            }}
          >
            {lineText}
          </text>
        ))}

        {/* Dynamic Gradient Filled Text revealed under mask */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#canvasTextGradient)"
          mask="url(#canvasTextMask)"
          style={{
            opacity: hovered ? 0.75 : 0.5,
            transition: "opacity 0.3s ease"
          }}
        />

        {/* Glow Layer on hover */}
        {hovered &&
          lines.map((lineText, idx) => (
            <text
              key={`glow-${idx}`}
              x="50%"
              y={lineYPositions[idx] || `${(idx + 1) * 40}%`}
              textAnchor="middle"
              dominantBaseline="middle"
              className="canvas-text-font"
              fill="url(#canvasTextGradient)"
              filter="url(#glowEffect)"
              opacity="0.65"
              pointerEvents="none"
            >
              {lineText}
            </text>
          ))}
      </svg>
    </div>
  );
}

export default CanvasText;
