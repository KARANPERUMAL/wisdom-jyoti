import React from "react";
import { CanvasText } from "./CanvasText";

export default function CanvasTextDemo() {
  return (
    <div className="canvas-demo-wrapper" style={{ minHeight: "260px", padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CanvasText text="How old are you?" />
    </div>
  );
}
