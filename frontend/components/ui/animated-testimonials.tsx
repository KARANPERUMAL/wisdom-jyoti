"use client";
import React, { useState, useEffect } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div className="relative h-80 w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.src}
              className="absolute inset-0 transition-all duration-300"
              style={{
                opacity: index === active ? 1 : 0.4,
                zIndex: index === active ? 20 : 5 - index,
              }}
            >
              <img
                src={testimonial.src}
                alt={testimonial.name}
                className="h-full w-full rounded-3xl object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-between py-4">
          <div>
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials[active].quote}
            </p>
          </div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AnimatedTestimonials;
