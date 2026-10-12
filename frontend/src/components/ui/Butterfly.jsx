import React from "react";

const butterflyConfigs = [
  {
    id: 1,
    className: "butterfly-1",
    size: 55,
    c1: "#e11d48",
    c2: "#f43f5e",
    c3: "#ffe343",
    spot: "#ffffff",
    spot2: "#ffe343",
  },
  {
    id: 2,
    className: "butterfly-2",
    size: 48,
    c1: "#0284c7",
    c2: "#38bdf8",
    c3: "#67e8f9",
    spot: "#ffffff",
    spot2: "#38bdf8",
  },
  {
    id: 3,
    className: "butterfly-3",
    size: 52,
    c1: "#d97706",
    c2: "#f59e0b",
    c3: "#fde047",
    spot: "#ffffff",
    spot2: "#fde047",
  },
  {
    id: 4,
    className: "butterfly-4",
    size: 46,
    c1: "#9333ea",
    c2: "#c084fc",
    c3: "#f472b6",
    spot: "#ffffff",
    spot2: "#c084fc",
  },
];

export function SingleButterfly({ config }) {
  const { id, className, size, c1, c2, c3, spot, spot2 } = config;

  return (
    <div className={`butterfly ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="butterfly-svg"
        width={size}
        height={size}
      >
        {/* Body */}
        <ellipse cx="50" cy="50" rx="3.5" ry="22" fill="#1e293b" />
        <circle cx="50" cy="24" r="4.5" fill="#1e293b" />
        {/* Antennae */}
        <path
          d="M48 22 Q40 10 34 8"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M52 22 Q60 10 66 8"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="34" cy="8" r="2" fill={c1} />
        <circle cx="66" cy="8" r="2" fill={c1} />

        {/* Left Wing Group */}
        <g className="wing left-wing">
          <path
            d="M50 45 C30 15, 0 20, 10 50 C18 65, 42 60, 50 50 Z"
            fill={`url(#leftGrad_${id})`}
            stroke={c2}
            strokeWidth="1.5"
          />
          <path
            d="M50 50 C30 60, 15 85, 30 92 C45 95, 48 70, 50 52 Z"
            fill={`url(#leftGradLower_${id})`}
            stroke={c2}
            strokeWidth="1.5"
          />
          <circle cx="25" cy="38" r="4.5" fill={spot} opacity="0.9" />
          <circle cx="32" cy="72" r="3" fill={spot2} opacity="0.9" />
        </g>

        {/* Right Wing Group */}
        <g className="wing right-wing">
          <path
            d="M50 45 C70 15, 100 20, 90 50 C82 65, 58 60, 50 50 Z"
            fill={`url(#rightGrad_${id})`}
            stroke={c2}
            strokeWidth="1.5"
          />
          <path
            d="M50 50 C70 60, 85 85, 70 92 C55 95, 52 70, 50 52 Z"
            fill={`url(#rightGradLower_${id})`}
            stroke={c2}
            strokeWidth="1.5"
          />
          <circle cx="75" cy="38" r="4.5" fill={spot} opacity="0.9" />
          <circle cx="68" cy="72" r="3" fill={spot2} opacity="0.9" />
        </g>

        {/* Gradients */}
        <defs>
          <linearGradient id={`leftGrad_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="60%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <linearGradient id={`leftGradLower_${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <linearGradient id={`rightGrad_${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c1} />
            <stop offset="60%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
          <linearGradient id={`rightGradLower_${id}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={c2} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function Butterfly() {
  return (
    <div className="hero-butterfly-container" aria-hidden="true">
      {butterflyConfigs.map((config) => (
        <SingleButterfly key={config.id} config={config} />
      ))}
    </div>
  );
}

export default Butterfly;
