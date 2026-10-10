import { useEffect, useMemo, useState } from "react";

import { Navbar } from "./components/layout/Navbar";
import { useReveal } from "./hooks/useReveal";

import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { GalleryPage } from "./pages/Gallery/GalleryPage";
import { TestimonialsPage } from "./pages/Testimonials/TestimonialsPage";
import { ContactPage } from "./pages/Contact/ContactPage";

import { initialForm } from "./data/constants";

export default function App() {
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
      <Navbar
        page={page}
        setPage={setPage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
      />

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
          />
        )}
      </main>
    </div>
  );
}
