import { useEffect, useMemo, useState } from "react";
import { CanvasText } from "./components/ui/CanvasText";
import { HoverEffect } from "./components/ui/card-hover-effect";
import { AnimatedTestimonials } from "./components/ui/animated-testimonials";
import { HoverBorderGradient } from "./components/ui/hover-border-gradient";
import logo from "./assets/images/logo.webp";
import brainGrowthImg from "./assets/images/brain-growth-begins-early-testimonialspage.jpg";
import rightAgeImg from "./assets/images/right-age-learning-rhythm-testimonialpage.jpg";
import confidenceImg from "./assets/images/confidence-through-practice-testimonialpage.jpg";
import heroCollage1 from "./assets/images/hero-collage-1.webp";
import heroCollage2 from "./assets/images/hero-collage-2.webp";
import heroCollage3 from "./assets/images/hero-collage-3.webp";
import dayCareImage from "./assets/images/day-care-homepage.webp";
import preNurseryImage from "./assets/images/pre-nursery-homepage.webp";
import nurseryImage from "./assets/images/nursery-homepage.webp";
import juniorLkgImage from "./assets/images/junior-lkg-homepage.jpg";
import seniorUkgImage from "./assets/images/senior-ukg-homepage.webp";
import gallery1 from "./assets/images/gallery1.jpeg";
import gallery2 from "./assets/images/gallery2.jpeg";
import gallery3 from "./assets/images/gallery3.jpeg";
import gallery4 from "./assets/images/gallery4.jpeg";
import gallery5 from "./assets/images/gallery5.jpeg";
import gallery6 from "./assets/images/gallery6.jpeg";
import gallery7 from "./assets/images/gallery7.jpeg";
import gallery8 from "./assets/images/gallery8.jpeg";
import video1 from "./assets/videos/video1.mp4";
import video2 from "./assets/videos/video2.mp4";
import video3 from "./assets/videos/video3.mp4";
import video4 from "./assets/videos/video4.mp4";

const navItems = [
  ["Home", "home"],
  ["About Us", "about"],
  ["Gallery", "gallery"],
  ["Testimonials", "testimonials"],
  ["Contact Us", "contact"],
];

const highlights = [
  "Play-Based Learning",
  "Fine Motor Skills",
  "Gross Motor Skills",
  "Brain Development Games",
  "Cognitive & Social Skills",
  "Reading & Writing",
  "Music & Dance",
  "Rhymes & Singing",
  "Personalized Care",
  "English, Kannada & Hindi",
];

const programs = [
  {
    title: "Day Care",
    age: "1.5 - 6 years",
    detail: "A calm, supervised care routine with creative play, rest time, personal attention, and safe daily engagement.",
    image: dayCareImage,
  },
  {
    title: "Pre Nursery",
    age: "1 - 3 years",
    detail: "Gentle first-school experiences through sensory play, rhymes, stories, movement, and joyful social habits.",
    image: preNurseryImage,
  },
  {
    title: "Nursery",
    age: "3 - 4 years",
    detail: "Early literacy, number sense, fine motor work, spoken language, music, dance, and confidence-building activities.",
    image: nurseryImage,
  },
  {
    title: "Junior KG / LKG",
    age: "4 - 5 years",
    detail: "Structured readiness with phonics, writing practice, number concepts, creative projects, and classroom independence.",
    image: juniorLkgImage,
  },
  {
    title: "Senior KG / UKG",
    age: "5 - 6 years",
    detail: "Primary-school preparation with reading, writing, math confidence, stage exposure, and social skill development.",
    image: seniorUkgImage,
  },
  {
    title: "Evening Classes",
    age: "Skill support",
    detail: "After-school learning support for children who need extra practice, activity time, or guided revision.",
    image: heroCollage1,
  },
];

const preschoolImportance = [
  {
    stat: "90%",
    title: "Brain growth begins early",
    detail:
      "A child’s first years are powerful for language, memory, attention, emotional confidence, and social habits.",
  },
  {
    stat: "1-6",
    title: "Right-age learning rhythm",
    detail:
      "Preschool gives children a gentle routine where play, music, stories, movement, and group time become learning.",
  },
  {
    stat: "Daily",
    title: "Confidence through practice",
    detail:
      "Small daily wins help children speak, share, ask questions, hold pencils, follow instructions, and enjoy school.",
  },
];

const preschoolTestimonials = [
  {
    name: "90% Brain Growth",
    designation: "Brain growth begins early",
    quote: "A child’s first years are powerful for language, memory, attention, emotional confidence, and social habits.",
    src: brainGrowthImg,
  },
  {
    name: "1 - 6 Years",
    designation: "Right-age learning rhythm",
    quote: "Preschool gives children a gentle routine where play, music, stories, movement, and group time become learning.",
    src: rightAgeImg,
  },
  {
    name: "Daily Practice",
    designation: "Confidence through practice",
    quote: "Small daily wins help children speak, share, ask questions, hold pencils, follow instructions, and enjoy school.",
    src: confidenceImg,
  },
];

const galleryMedia = [
  { type: "image", src: gallery1, className: "wide", label: "Wisdom Jyoti school activity 1" },
  { type: "video", src: video1, poster: gallery1, className: "video tall", label: "Wisdom Jyoti school video 1" },
  { type: "image", src: gallery2, className: "tall", label: "Wisdom Jyoti school activity 2" },
  { type: "image", src: gallery3, className: "", label: "Wisdom Jyoti school activity 3" },
  { type: "video", src: video2, poster: gallery3, className: "video square", label: "Wisdom Jyoti school video 2" },
  { type: "image", src: gallery4, className: "square", label: "Wisdom Jyoti school activity 4" },
  { type: "image", src: gallery5, className: "tall", label: "Wisdom Jyoti school activity 5" },
  { type: "video", src: video3, poster: gallery6, className: "video wide", label: "Wisdom Jyoti school video 3" },
  { type: "image", src: gallery6, className: "wide", label: "Wisdom Jyoti school activity 6" },
  { type: "image", src: gallery7, className: "", label: "Wisdom Jyoti school activity 7" },
  { type: "video", src: video4, poster: gallery8, className: "video tall", label: "Wisdom Jyoti school video 4" },
  { type: "image", src: gallery8, className: "square", label: "Wisdom Jyoti school activity 8" },
];

const initialForm = {
  parentName: "",
  childName: "",
  phone: "",
  email: "",
  program: "Nursery",
  message: "",
};

function useReveal(page) {
  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);
}

export default function AppPages() {
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useReveal(page);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [page]);

  const mapUrl = useMemo(
    () =>
      "https://www.google.com/maps/search/?api=1&query=Wisdom%20Jyoti%20274%202nd%20Main%20Rd%20West%20of%20Chord%20Road%202nd%20Stage%20Mahalakshmipuram%20Bengaluru%20Karnataka%20560086",
    []
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="app app-v2">
      <header className={scrolled ? "site-header header-v2 compact" : "site-header header-v2"}>
        <button className="brand brand-v2" onClick={() => setPage("home")} aria-label="Go to home">
          <img src={logo} alt="Wisdom Jyoti logo" />
          <span>
            <strong>Wisdom Jyoti</strong>
            <small>Preschool & Skill Development Center</small>
          </span>
        </button>

        <nav className={menuOpen ? "nav nav-v2 open" : "nav nav-v2"}>
          {navItems.map(([label, id]) => (
            <button className={page === id ? "active" : ""} key={id} onClick={() => setPage(id)}>
              {label}
            </button>
          ))}
        </nav>

        <button className="outline-action" onClick={() => setPage("contact")}>
          Enquiry <span aria-hidden="true">-&gt;</span>
        </button>

        <button
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <main className="page-shell-v2" key={page}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "about" && <AboutPage />}
        {page === "gallery" && <GalleryPage />}
        {page === "testimonials" && <TestimonialsPage />}
        {page === "contact" && (
          <ContactPage
            form={form}
            submitted={submitted}
            onChange={onChange}
            onSubmit={onSubmit}
            mapUrl={mapUrl}
          />
        )}
      </main>
    </div>
  );
}

function HomePage({ setPage }) {
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
          <div className="hero-collage" aria-label="Wisdom Jyoti preschool collage">
            <figure className="hero-collage-photo hero-collage-one">
              <img src={heroCollage1} alt="Children sitting together during preschool activity" />
            </figure>
            <figure className="hero-collage-photo hero-collage-two">
              <img src={heroCollage2} alt="Preschool classroom activity at Wisdom Jyoti" />
            </figure>
            <figure className="hero-collage-photo hero-collage-three">
              <img src={heroCollage3} alt="Children enjoying early learning moments" />
            </figure>
          </div>
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
            <article className="program-card premium-hover" key={program.title} style={{ "--i": index }}>
              <img className="program-card-image" src={program.image} alt={`${program.title} learning environment`} loading="lazy" />
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

function AboutPage() {
  return (
    <>
      <section className="inner-hero about-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">About Us</p>
          <h2>Building wise leaders of the future.</h2>
          <p>
            Established in 2024, Wisdom Jyoti Preschool & Skill Development Center gives
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
            <article className="program-detail-card yellow-hover-card" key={program.title} data-reveal style={{ "--i": index }}>
              {program.image && (
                <img className="program-card-image" src={program.image} alt={`${program.title} learning environment`} loading="lazy" />
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

function GalleryPage() {
  return (
    <>
      <section className="inner-hero gallery-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Gallery</p>
          <h2>Moments from school, arranged like a living scrapbook.</h2>
          <p>
            Photos and videos are mixed in a playful collage so the page feels active,
            warm, and less like a regular fixed grid.
          </p>
        </div>
      </section>

      <section className="page-section-v2 gallery-collage">
        {galleryMedia.map((item, index) => (
          <figure className={`collage-tile image-${index + 1} ${item.className}`} key={item.src} data-reveal>
            {item.type === "video" ? (
              <>
                <span className="video-label">Video {galleryMedia.slice(0, index + 1).filter((media) => media.type === "video").length}</span>
                <video controls muted preload="metadata" poster={item.poster}>
                  <source src={item.src} type="video/mp4" />
                </video>
              </>
            ) : (
              <img src={item.src} alt={item.label} loading="lazy" />
            )}
          </figure>
        ))}
      </section>
    </>
  );
}

function TestimonialsPage() {
  return (
    <section className="page-section-v2 testimonials-page importance-page">
      <div className="section-heading center" data-reveal>
        <p className="eyebrow red-eyebrow">Why Preschool Matters</p>
        <h2>Early childhood education shapes confidence before school begins.</h2>
      </div>

      <div data-reveal style={{ width: "100%", marginBlock: "1.5rem" }}>
        <AnimatedTestimonials testimonials={preschoolTestimonials} autoplay={true} />
      </div>

      <div className="brain-path" data-reveal>
        <span>New sounds</span>
        <i />
        <span>New words</span>
        <i />
        <span>New friends</span>
        <i />
        <span>New confidence</span>
      </div>
    </section>
  );
}

function ContactPage({ form, submitted, onChange, onSubmit, mapUrl }) {
  return (
    <>
      <section className="inner-hero contact-hero">
        <div data-reveal>
          <p className="eyebrow red-eyebrow">Contact Us</p>
          <h2>Admission enquiry for Wisdom Jyoti.</h2>
          <p>
            Wisdom Jyoti, 274, 2nd Main Rd, West of Chord Road 2nd Stage,
            Mahalakshmipuram, Bengaluru, Karnataka 560086
          </p>
          <div className="contact-phone-bar" style={{ marginTop: "0.85rem" }}>
            <span style={{ fontWeight: 800, color: "var(--red)" }}>Call Us directly: </span>
            <a href="tel:9738981455" className="contact-phone-link">9738981455</a>
            <span style={{ marginInline: "0.4rem" }}>/</span>
            <a href="tel:6362424401" className="contact-phone-link">6362424401</a>
          </div>
        </div>
        <div className="contact-mini-card premium-hover" data-reveal>
          <img src={logo} alt="Wisdom Jyoti logo" />
          <strong>For registration call</strong>
          <span>
            <a href="tel:9738981455" className="contact-phone-link">9738981455</a> / <a href="tel:6362424401" className="contact-phone-link">6362424401</a>
          </span>
          <span>8 am - 8 pm</span>
        </div>
      </section>

      <section className="page-section-v2 enquiry-page">
        <div className="form-panel" data-reveal>
          <div>
            <p className="eyebrow">Admission Form</p>
            <h2>Tell us about your child.</h2>
            <p>
              This frontend form is ready. In the backend step, it can send the enquiry
              directly to the manager mail ID.
            </p>
            <div className="contact-actions">
              <a className="paint-button" href={mapUrl} target="_blank" rel="noreferrer">
                Open Map <span aria-hidden="true">-&gt;</span>
              </a>
              <a
                className="text-button"
                href="https://www.instagram.com/wisdom_jyoti?psln=MWJmdDlianU2eTU5cQ=="
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
          <form onSubmit={onSubmit}>
            <label>
              Parent name
              <input name="parentName" value={form.parentName} onChange={onChange} placeholder="Your name" required />
            </label>
            <label>
              Child name
              <input name="childName" value={form.childName} onChange={onChange} placeholder="Child name" required />
            </label>
            <label>
              Phone number
              <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" required />
            </label>
            <label>
              Email
              <input type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
            </label>
            <label>
              Program
              <select name="program" value={form.program} onChange={onChange}>
                {programs.map((program) => (
                  <option key={program.title}>{program.title}</option>
                ))}
              </select>
            </label>
            <label className="wide">
              Message
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Preferred timing, age, or anything you want us to know"
                rows="4"
              />
            </label>
            <button className="paint-button wide" type="submit">
              Send Enquiry <span aria-hidden="true">-&gt;</span>
            </button>
            {submitted && (
              <p className="success-message">
                Thank you. Your enquiry is ready; email delivery will be connected in the backend.
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
