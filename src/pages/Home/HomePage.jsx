import { CanvasText } from "../../components/ui/CanvasText";
import { DraggableCardContainer, DraggableCardBody } from "../../components/ui/draggable-card";
import { ProgramCardItem } from "../../components/ui/ProgramCardItem";
import { programs } from "../../data/programs";
import heroCollage1 from "../../assets/images/hero-collage-1.jpeg";
import heroCollage2 from "../../assets/images/hero-collage-2.jpeg";
import heroCollage3 from "../../assets/images/hero-collage-3.jpeg";

export function HomePage({ setPage }) {
  return (
    <>
      <section className="hero hero-v2">
        <div className="hero-copy" data-reveal>
          <h1>
            Little minds,
            <span>wise futures</span>
          </h1>
          <p className="hero-text">
            Wisdom Jyoti is a preschool and skill development center in Mahalakshmipuram,
            creating confident early learners through play, language, movement, music, and care.
          </p>
          <div className="hero-actions">
            <button className="paint-button" onClick={() => setPage("contact")}>
              Apply Now <span aria-hidden="true">-&gt;</span>
            </button>
            <button className="text-button" onClick={() => setPage("about")}>
              Explore Programs
            </button>
          </div>
        </div>

        <div className="hero-visual hero-visual-v2" data-reveal>
          <DraggableCardContainer className="hero-collage" aria-label="Wisdom Jyoti preschool collage">
            <DraggableCardBody className="hero-collage-photo hero-collage-one">
              <img src={heroCollage1} alt="Children sitting together during preschool activity" draggable="false" />
            </DraggableCardBody>
            <DraggableCardBody className="hero-collage-photo hero-collage-two">
              <img src={heroCollage3} alt="Preschool classroom activity at Wisdom Jyoti" draggable="false" />
            </DraggableCardBody>
            <DraggableCardBody className="hero-collage-photo hero-collage-three">
              <img src={heroCollage2} alt="Children enjoying early learning moments" draggable="false" />
            </DraggableCardBody>
          </DraggableCardContainer>
          <div className="photo-card card-one">
            <span>Age Group</span>
            <strong>1 to 6 years</strong>
          </div>
          <p className="scribble note-one">Great place to be</p>
        </div>
      </section>

      <section className="ticker ticker-v2">
        {["Pre Nursery", "Nursery", "Junior KG", "Senior KG", "Day Care", "Evening Classes"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="age-question-section" data-reveal>
        <p className="age-kicker">Find the right class</p>
        <div className="age-text-wrapper" style={{ width: "100%", maxWidth: "1000px" }}>
          <CanvasText lines={["HOW OLD", "ARE YOU?"]} />
        </div>
      </section>

      <section className="page-section-v2" data-reveal>
        <div className="section-heading center">
          <p className="eyebrow">Creative Learning</p>
          <h2>Everything parents need to understand at a glance.</h2>
        </div>
        <div className="program-preview-grid">
          {programs.slice(0, 5).map((program, index) => (
            <ProgramCardItem
              key={program.id || program.title}
              program={program}
              index={index}
              setPage={setPage}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
