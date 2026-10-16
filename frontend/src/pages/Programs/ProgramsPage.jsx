import React from "react";
import { SEO } from "../../components/layout/SEO";
import { ProgramCardItem } from "../../components/ui/ProgramCardItem";
import { programs } from "../../data/programs";
import { highlights } from "../../data/highlights";

export function ProgramsPage({ setPage }) {
  const auraSizes = [
    "aura aura-lg",
    "aura aura-sm",
    "aura",
    "aura aura-xl",
    "aura aura-sm",
    "aura aura-lg",
    "aura",
    "aura aura-sm",
    "aura aura-lg",
    "aura aura-xl",
  ];

  return (
    <>
      <SEO
        title="Preschool Programs | Day Care, Nursery & Kindergarten | Wisdom Jyoti"
        description="Explore early learning programs at Wisdom Jyoti Preschool in Bengaluru: Day Care, Pre-Nursery, Nursery, Junior KG, Senior KG and after-school evening classes."
        path="/programs"
        image="/og/og-programs.webp"
      />

      <section className="inner-hero programs-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Curriculum &amp; Age Groups</p>
          <h1>Preschool Programs for Every Age &amp; Stage.</h1>
          <p>
            From gentle first-school sensory exploration to foundational reading, numeracy,
            and kindergarten readiness, our programs nurture curiosity, confidence, and joyful discovery.
          </p>
        </div>
      </section>

      <section className="page-section-v2 split-section">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Core Learning Areas</p>
          <h2>Holistic skill development through joyful engagement.</h2>
          <p style={{ marginTop: "0.8rem", color: "#475569", fontSize: "1.05rem", lineHeight: "1.6" }}>
            Every class builds upon essential milestones — balancing physical agility, speech,
            rhythm, emotional warmth, and early academic readiness.
          </p>
        </div>

        <div
          className="skills-gradient-grid"
          data-reveal
          style={{ width: "100%", marginTop: "1.5rem" }}
        >
          <div className="aura-grid">
            {highlights.map((highlight, index) => (
              <div
                className={auraSizes[index % auraSizes.length]}
                key={highlight}
              >
                <button className="btn" type="button">{highlight}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-v2 program-detail-section">
        <div className="section-heading center" data-reveal style={{ marginBottom: "2.5rem" }}>
          <p className="eyebrow red-eyebrow">Explore Classes</p>
          <h2>Choose the right program for your child.</h2>
        </div>
        <div className="program-detail-grid">
          {programs.map((program, index) => (
            <ProgramCardItem
              key={program.id || program.title}
              program={program}
              index={index}
              variant="about"
              setPage={setPage}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default ProgramsPage;
