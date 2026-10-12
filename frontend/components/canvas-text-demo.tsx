"use client";
import React from "react";
import { CanvasText } from "./ui/canvas-text";

export default function CanvasTextDemo() {
  return (
    <div className="flex min-h-80 items-center justify-center p-8">
      <CanvasText text="How old are you?" />
    </div>
  );
}
