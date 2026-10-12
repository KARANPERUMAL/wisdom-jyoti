import React from "react";

export function SunAnimation() {
  return (
    <div className="hero-sun-container" aria-hidden="true">
      <svg
        viewBox="0 0 200 200"
        className="smiling-sun-svg"
        width="160"
        height="160"
      >
        <defs>
          <radialGradient id="sunBodyGrad" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffeb3b" />
            <stop offset="70%" stopColor="#fbc02d" />
            <stop offset="100%" stopColor="#f57f17" />
          </radialGradient>
          <filter id="sunGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sun Beams / Rays */}
        <g className="sun-rays" stroke="#fbc02d" strokeWidth="6" strokeLinecap="round">
          {/* 16 Rays around 360deg */}
          <line x1="100" y1="10" x2="100" y2="28" />
          <line x1="100" y1="172" x2="100" y2="190" />
          <line x1="10" y1="100" x2="28" y2="100" />
          <line x1="172" y1="100" x2="190" y2="100" />

          {/* Diagonals */}
          <line x1="36" y1="36" x2="49" y2="49" />
          <line x1="151" y1="151" x2="164" y2="164" />
          <line x1="164" y1="36" x2="151" y2="49" />
          <line x1="49" y1="151" x2="36" y2="164" />

          {/* Intermediate small rays */}
          <line x1="68" y1="18" x2="73" y2="32" strokeWidth="4" />
          <line x1="132" y1="18" x2="127" y2="32" strokeWidth="4" />
          <line x1="18" y1="68" x2="32" y2="73" strokeWidth="4" />
          <line x1="18" y1="132" x2="32" y2="127" strokeWidth="4" />
          <line x1="182" y1="68" x2="168" y2="73" strokeWidth="4" />
          <line x1="182" y1="132" x2="168" y2="127" strokeWidth="4" />
          <line x1="68" y1="182" x2="73" y2="168" strokeWidth="4" />
          <line x1="132" y1="182" x2="127" y2="168" strokeWidth="4" />
        </g>

        {/* Main Sun Body Circle */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="url(#sunBodyGrad)"
          stroke="#f57f17"
          strokeWidth="3"
          filter="url(#sunGlowFilter)"
        />

        {/* Cute Cheerful Eyes (Happy Curves) */}
        <path
          d="M72 88 Q82 74 92 88"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M108 88 Q118 74 128 88"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Eyebrows */}
        <path
          d="M71 77 Q81 72 90 78"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M110 78 Q119 72 129 77"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Rosy Blush Cheeks */}
        <circle cx="68" cy="102" r="10" fill="#ff7043" opacity="0.8" />
        <circle cx="132" cy="102" r="10" fill="#ff7043" opacity="0.8" />

        {/* Big Happy Smile */}
        <path
          d="M78 108 Q100 134 122 108"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default SunAnimation;
