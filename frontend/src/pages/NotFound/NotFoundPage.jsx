import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/layout/SEO";

export function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Wisdom Jyoti Preschool"
        description="The page you requested could not be found. Return to Wisdom Jyoti Preschool home page."
        path="/404"
        image="/og/og-home.webp"
      />
      <section
        className="inner-hero not-found-hero"
        style={{
          textAlign: "center",
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 1.5rem",
        }}
      >
        <div data-reveal style={{ maxWidth: "620px", margin: "0 auto" }}>
          <p
            className="eyebrow red-eyebrow"
            style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
          >
            404 Error
          </p>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)",
              marginBottom: "1rem",
              lineHeight: "1.1",
            }}
          >
            Page Not Found
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "2rem",
              lineHeight: "1.65",
            }}
          >
            We couldn't find the page you're looking for. It may have moved or no longer exists.
            Let's get you back to our cheerful preschool community!
          </p>
          <Link
            to="/"
            className="paint-button"
            style={{ display: "inline-flex", textDecoration: "none" }}
          >
            Back to Home →
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFoundPage;
