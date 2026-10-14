
import { Helmet } from "react-helmet-async";
import { ProgramCardItem } from "../../components/ui/ProgramCardItem";
import { programs } from "../../data/programs";
import { highlights } from "../../data/highlights";

export function AboutPage({ setPage }) {
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
      <Helmet>
        <title>
          About Wisdom Jyoti Preschool &amp; Skill Development Center
        </title>

        <meta
          name="description"
          content="Learn about Wisdom Jyoti Preschool & Skill Development Center, its child-focused learning approach, creative activities, early education programmes and Day Care."
        />
      </Helmet>

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
                <button className="btn">{highlight}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section-v2 program-detail-section">
        <div className="program-detail-grid">
          {programs.slice(0, 5).map((program, index) => (
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

export default AboutPage;
