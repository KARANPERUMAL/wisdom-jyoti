import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "./draggable-card";

export default function DraggableCardDemo() {
  const items = [
    {
      title: "Wisdom Jyoti Preschool",
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <DraggableCardContainer className="flex items-center justify-center min-h-[400px]">
      {items.map((item, index) => (
        <DraggableCardBody key={index} className="w-80 h-96 p-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-xl"
            draggable="false"
          />
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
