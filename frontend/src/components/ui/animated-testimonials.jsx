import React, { useState, useEffect } from "react";

export function AnimatedTestimonials({
  testimonials = [],
  autoplay = true
}) {
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

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="animated-testimonials-container">
      <div className="animated-testimonials-grid">
        {/* Left Side: Stacked Image Cards */}
        <div className="testimonials-image-wrapper">
          <div className="testimonials-image-stack">
            {testimonials.map((item, idx) => {
              const isActive = idx === active;
              const rotationDeg = isActive ? 0 : (idx % 2 === 0 ? 6 : -6);
              const scaleVal = isActive ? 1 : 0.92;
              const opacityVal = isActive ? 1 : 0.4;
              const zIndexVal = isActive ? 10 : 5 - idx;

              return (
                <div
                  key={item.src + idx}
                  className={`testimonial-img-card ${isActive ? "active-card" : ""}`}
                  style={{
                    transform: `rotate(${rotationDeg}deg) scale(${scaleVal})`,
                    opacity: opacityVal,
                    zIndex: zIndexVal,
                    transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt || ""}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  {isActive && <div className="img-card-badge">{item.name}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Content & Controls */}
        <div className="testimonials-content-wrapper">
          <div className="testimonial-text-box" key={active}>
            <h3 className="testimonial-name">{testimonials[active].name}</h3>
            <p className="testimonial-role">{testimonials[active].designation}</p>
            <p className="testimonial-quote">
              "{testimonials[active].quote}"
            </p>
          </div>

          <div className="testimonials-controls">
            <button
              onClick={handlePrev}
              className="testimonial-nav-btn"
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div className="testimonial-dots">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`testimonial-dot ${idx === active ? "active" : ""}`}
                  onClick={() => setActive(idx)}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="testimonial-nav-btn"
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimatedTestimonials;
