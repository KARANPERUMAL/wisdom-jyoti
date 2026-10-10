import { HoverBorderGradient } from "../../components/ui/hover-border-gradient";
import { programs } from "../../data/programs";
import { highlights } from "../../data/highlights";

export function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">About Us</p>
          <h2>Building wise leaders of the future.</h2>
          <p>
            Established in 2024, Wisdom Jyoti Preschool &amp; Skill Development Center gives
            children a joyful first learning experience rooted in care, confidence,
            language, creativity, and social growth.
          </p>
        </div>
      </section>

      <section className="page-section-v2 split-section">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Programs</p>
          <h2>Pre Nursery, Nursery, Junior KG, Senior KG and Day Care.</h2>
        </div>
        <div className="skills-gradient-grid" data-reveal style={{ width: "100%", marginTop: "1.5rem" }}>
          <div className="hover-border-grid">
            {highlights.map((highlight) => (
              <HoverBorderGradient key={highlight} containerClassName="skill-gradient-card">
                <span className="skill-gradient-title">{highlight}</span>
              </HoverBorderGradient>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-v2 program-detail-section">
        <div className="program-detail-grid">
          {programs.slice(0, 5).map((program, index) => (
            <article
              className="program-detail-card yellow-hover-card"
              key={program.title}
              data-reveal
              style={{ "--i": index }}
            >
              {program.image && (
                <img
                  className="program-card-image"
                  src={program.image}
                  alt={`${program.title} learning environment`}
                  loading="lazy"
                />
              )}
              <p>{program.age}</p>
              <h3>{program.title}</h3>
              <span>{program.detail}</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutPage;
