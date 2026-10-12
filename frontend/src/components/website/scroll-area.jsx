import React from "react";
import { cn } from "../../lib/utils";

export function ScrollArea({ children, className, style, type = "scroll" }) {
  return (
    <div
      className={cn("overflow-y-auto max-h-[80vh] custom-scroll-area", className)}
      style={{
        overflowY: "auto",
        maxHeight: "75vh",
        paddingRight: "4px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
