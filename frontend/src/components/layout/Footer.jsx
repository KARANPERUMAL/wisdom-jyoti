import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.webp";
import { programs } from "../../data/programs";
import { mapUrl } from "../../data/constants";
import { ProgramModal } from "../ui/ProgramModal";

export function Footer({ onOpenEnquiry }) {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const currentYear = new Date().getFullYear();
  const footerPrograms = programs.filter((p) => p.id !== "evening-classes");

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
  };

  const closeProgramModal = () => {
    setSelectedProgram(null);
  };

  return (
    <>
      <footer className="site-footer" style={{ backgroundColor: "#06182f", color: "#f8fafc" }}>
        {/* Main Footer Container */}
        <div
          className="footer-content"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "4.5rem clamp(1.2rem, 4vw, 3.5rem) 2.5rem clamp(1.2rem, 4vw, 3.5rem)",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2.8rem 2rem",
            }}
          >
            {/* Column 1: Brand & About */}
            <div className="footer-col footer-brand-col">
              <Link
                to="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  textDecoration: "none",
                  marginBottom: "1.2rem",
                }}
              >
                <img
                  src={logo}
                  alt="Wisdom Jyoti logo"
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                />
                <div>
                  <strong
                    style={{
                      display: "block",
                      color: "#ffffff",
                      fontSize: "1.25rem",
                      fontWeight: "800",
                      lineHeight: "1.2",
                    }}
                  >
                    Wisdom Jyoti
                  </strong>
                  <small
                    style={{
                      display: "block",
                      color: "#ffe343",
                      fontSize: "0.78rem",
                      fontWeight: "700",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Preschool &amp; Skill Development Center
                  </small>
                </div>
              </Link>

              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.92rem",
                  lineHeight: "1.65",
                  margin: "0 0 1.5rem 0",
                }}
              >
                A joyful, child-centric early childhood learning community in Mahalakshmipuram,
                Bengaluru. Nurturing curiosity, foundational skills, and playful confidence
                every single day.
              </p>

              {/* Social Media Links */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                <a
                  href="https://www.instagram.com/wisdom_jyoti?psln=MWJmdDlianU2eTU5cQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Wisdom Jyoti Preschool on Instagram"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "background 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#e1306c";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Instagram SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://wa.me/919738981455?text=Hello%20Wisdom%20Jyoti%20Preschool%2C%20I%20would%20like%20to%20enquire%20about%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Wisdom Jyoti on WhatsApp"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "background 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#25D366";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* WhatsApp SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>

                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Wisdom Jyoti location on Google Maps"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "background 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#3b82f6";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Map Pin SVG */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: "800",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                  position: "relative",
                  paddingBottom: "0.5rem",
                  borderBottom: "2px solid #ef1118",
                  display: "inline-block",
                }}
              >
                Quick Links
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                {[
                  ["Home", "/"],
                  ["About Us", "/about"],
                  ["Programs", "/programs"],
                  ["Gallery", "/gallery"],
                  ["Testimonials", "/testimonials"],
                  ["Contact Us", "/contact"],
                ].map(([label, path]) => (
                  <li key={path}>
                    <Link
                      to={path}
                      style={{
                        color: "#cbd5e1",
                        textDecoration: "none",
                        fontSize: "0.92rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "color 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ffe343";
                        e.currentTarget.style.transform = "translateX(3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#cbd5e1";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <span style={{ color: "#ef1118", fontSize: "0.75rem" }}>▸</span>
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Preschool Programs (Clickable Modal Triggers) */}
            <div className="footer-col">
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: "800",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                  position: "relative",
                  paddingBottom: "0.5rem",
                  borderBottom: "2px solid #ffe343",
                  display: "inline-block",
                }}
              >
                Our Programs
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                {footerPrograms.map((prog) => (
                  <li key={prog.id || prog.title}>
                    <button
                      type="button"
                      onClick={() => handleProgramClick(prog)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        color: "#cbd5e1",
                        fontSize: "0.92rem",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        textAlign: "left",
                        transition: "color 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#ffe343";
                        e.currentTarget.style.transform = "translateX(3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#cbd5e1";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <span style={{ color: "#ffe343", fontSize: "0.75rem" }}>▸</span>
                      <span>{prog.title}</span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          color: "#94a3b8",
                          background: "rgba(255, 255, 255, 0.08)",
                          padding: "0.15rem 0.45rem",
                          borderRadius: "4px",
                        }}
                      >
                        {prog.age}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Hours */}
            <div className="footer-col">
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: "1.05rem",
                  fontWeight: "800",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: "1.2rem",
                  position: "relative",
                  paddingBottom: "0.5rem",
                  borderBottom: "2px solid #8fe6fb",
                  display: "inline-block",
                }}
              >
                Get In Touch
              </h3>

              <div style={{ display: "grid", gap: "1rem", fontSize: "0.92rem", color: "#cbd5e1" }}>
                {/* Physical Address */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                  <span style={{ color: "#ffe343", fontSize: "1.1rem", marginTop: "-2px" }}>📍</span>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      lineHeight: "1.5",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffe343")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  >
                    Wisdom Jyoti, 274, 2nd Main Rd, West of Chord Road 2nd Stage,
                    Mahalakshmipuram, Bengaluru 560086
                  </a>
                </div>

                {/* Phone Numbers */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: "#ef1118", fontSize: "1.1rem" }}>📞</span>
                  <div>
                    <a
                      href="tel:9738981455"
                      style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        textDecoration: "none",
                        marginRight: "0.4rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffe343")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      9738981455
                    </a>
                    <span style={{ color: "#64748b" }}>/</span>
                    <a
                      href="tel:6362424401"
                      style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        textDecoration: "none",
                        marginLeft: "0.4rem",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ffe343")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      6362424401
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ color: "#8fe6fb", fontSize: "1.1rem" }}>✉️</span>
                  <a
                    href="mailto:karanperumaln@gmail.com"
                    style={{
                      color: "#cbd5e1",
                      textDecoration: "none",
                      wordBreak: "break-all",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ffe343")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                  >
                    karanperumaln@gmail.com
                  </a>
                </div>

                {/* Admission Enquiry Button */}
                {onOpenEnquiry && (
                  <button
                    type="button"
                    onClick={onOpenEnquiry}
                    style={{
                      marginTop: "0.5rem",
                      background: "#ef1118",
                      color: "#ffffff",
                      border: "none",
                      padding: "0.65rem 1.25rem",
                      borderRadius: "999px",
                      fontWeight: "700",
                      fontSize: "0.88rem",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.4rem",
                      boxShadow: "0 4px 14px rgba(239, 17, 24, 0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 6px 18px rgba(239, 17, 24, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(239, 17, 24, 0.3)";
                    }}
                  >
                    Admission Enquiry <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar Divider */}
          <div
            style={{
              marginTop: "3.5rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.12)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              fontSize: "0.85rem",
              color: "#94a3b8",
            }}
          >
            <div>
              © {currentYear} <strong>Wisdom Jyoti Preschool &amp; Skill Development Center</strong>.
              All rights reserved.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span>Bengaluru, Karnataka</span>
              <span>•</span>
              <span style={{ color: "#ffe343" }}>Empowering Early Minds</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Program Details Modal (Rendered when any program in footer is clicked) */}
      {selectedProgram && (
        <ProgramModal
          program={selectedProgram}
          isOpen={Boolean(selectedProgram)}
          onClose={closeProgramModal}
          onOpenEnquiry={onOpenEnquiry}
        />
      )}
    </>
  );
}

export default Footer;
