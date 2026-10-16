import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { FloatingWhatsApp } from "./components/layout/FloatingWhatsApp";
import { useReveal } from "./hooks/useReveal";

// HomePage is eagerly loaded — it is the initial landing view
import { HomePage } from "./pages/Home/HomePage";

// Lazy-loaded routes: each becomes a separate JS chunk
const AboutPage        = lazy(() => import("./pages/About/AboutPage"));
const ProgramsPage     = lazy(() => import("./pages/Programs/ProgramsPage"));
const GalleryPage      = lazy(() => import("./pages/Gallery/GalleryPage"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials/TestimonialsPage"));
const ContactPage      = lazy(() => import("./pages/Contact/ContactPage"));
const NotFoundPage     = lazy(() => import("./pages/NotFound/NotFoundPage"));

// Lazy-loaded dialog: chunk is NOT requested until first open
const EnquiryDialog    = lazy(() => import("./components/ui/EnquiryDialog"));

import { initialForm } from "./data/constants";
import { submitAdmissionEnquiry } from "./services/enquiryApi";

/** Minimal fallback: preserves min-height to prevent layout shift */
function PageFallback() {
  return <div style={{ minHeight: "100vh" }} aria-hidden="true" />;
}

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  // Tracks whether the dialog has ever been opened this session.
  // EnquiryDialog is not mounted (and its chunk not fetched) until first open.
  const [dialogEverOpened, setDialogEverOpened] = useState(false);

  // Re-run animation observers whenever route changes
  useReveal(location.pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [location.pathname]);

  const handleOpenEnquiry = () => {
    setDialogEverOpened(true);
    setEnquiryOpen(true);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitAdmissionEnquiry(form);
    } catch (err) {
      console.warn("Contact page submission notice:", err);
    } finally {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <div className="app app-v2">
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrolled={scrolled}
        onOpenEnquiry={handleOpenEnquiry}
      />

      <Suspense fallback={<PageFallback />}>
        <main className="page-shell-v2" key={location.pathname}>
          <Routes>
            <Route
              path="/"
              element={<HomePage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/about"
              element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route
              path="/programs"
              element={<ProgramsPage onOpenEnquiry={handleOpenEnquiry} />}
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route
              path="/contact"
              element={
                <ContactPage
                  form={form}
                  submitted={submitted}
                  onChange={onChange}
                  onSubmit={onSubmit}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>

      <Footer onOpenEnquiry={handleOpenEnquiry} />

      <FloatingWhatsApp />

      {/* Dialog chunk only fetched after first Enquiry button click */}
      {dialogEverOpened && (
        <Suspense fallback={null}>
          <EnquiryDialog
            isOpen={enquiryOpen}
            onClose={() => setEnquiryOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
}
