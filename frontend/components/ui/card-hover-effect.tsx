"use client";
import React, { useState } from "react";

export interface HoverEffectItem {
  title: string;
  description?: string;
  link?: string;
}

export function HoverEffect({
  items,
  className = "",
}: {
  items: (string | HoverEffectItem)[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`card-hover-grid ${className}`}>
      {items.map((item, idx) => {
        const title = typeof item === "string" ? item : item.title;
        const description = typeof item === "object" ? item.description : undefined;

        return (
          <div
            key={title}
            className="card-hover-item"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="card-hover-pill"
              style={{
                opacity: hoveredIndex === idx ? 1 : 0,
                transform: hoveredIndex === idx ? "scale(1)" : "scale(0.92)",
                transition: "opacity 0.22s ease, transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            />
            <div className={`card-hover-content ${hoveredIndex === idx ? "is-hovered" : ""}`}>
              <h4 className="card-hover-title">{title}</h4>
              {description && <p className="card-hover-desc">{description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HoverEffect;
