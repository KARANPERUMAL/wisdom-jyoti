import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "../website/scroll-area";
import { programs } from "../../data/programs";
import { initialForm } from "../../data/constants";
import { Dropdown } from "./Dropdown";
import { submitAdmissionEnquiry } from "../../services/enquiryApi";

export function EnquiryDialog({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.parentName.trim()) newErrors.parentName = "Parent's name is required";
    if (!form.childName.trim()) newErrors.childName = "Child's name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      await submitAdmissionEnquiry(form);
    } catch (err) {
      console.warn("Enquiry submission notice:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm(initialForm);
    setErrors({});
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="enquiry-dialog-portal-root"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 999999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            boxSizing: "border-box",
            pointerEvents: "auto",
          }}
        >
          {/* Blurred Backdrop matching program cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 999999,
            }}
          />

          {/* Modal Container */}
          <div
            style={{
              position: "relative",
              zIndex: 1000000,
              width: "100%",
              maxWidth: "580px",
              maxHeight: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 25,
              }}
              style={{
                width: "100%",
                maxHeight: "88vh",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                borderRadius: "20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                border: "1px solid #f1f5f9",
                overflow: "hidden",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: "absolute",
                  top: "1.1rem",
                  right: "1.1rem",
                  zIndex: 1000005,
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(0,0,0,0.08)",
                  color: "#0f172a",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.16)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <ScrollArea className="h-full max-h-[88vh]">
                <div style={{ padding: "1.75rem clamp(1.2rem, 3.5vw, 2.2rem)" }}>
                  {/* Badge & Heading */}
                  <div style={{ marginBottom: "1.25rem", paddingRight: "2.2rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#ffe343",
                        color: "#06182f",
                        fontWeight: "900",
                        fontSize: "0.76rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "999px",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Admission Enquiry 2026-27
                    </span>
                    <h2
                      style={{
                        margin: "0.2rem 0 0.4rem 0",
                        fontSize: "clamp(1.4rem, 3.2vw, 1.95rem)",
                        fontWeight: "900",
                        color: "#06182f",
                        lineHeight: "1.15",
                      }}
                    >
                      Tell us about your child
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.94rem",
                        color: "#64748b",
                        lineHeight: "1.5",
                      }}
                    >
                      Wisdom Jyoti Preschool &amp; Skill Development Center, Mahalakshmipuram
                    </p>
                  </div>

                  {/* Quick Direct Call bar */}
                  <div
                    style={{
                      background: "#f8fafc",
                      border: "1.5px dashed #cbd5e1",
                      borderRadius: "12px",
                      padding: "0.75rem 1rem",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ fontSize: "0.88rem", color: "#334155" }}>
                      <strong style={{ color: "#ef1118" }}>Call Us Directly: </strong>
                      <a
                        href="tel:9738981455"
                        style={{
                          color: "#06182f",
                          fontWeight: "800",
                          textDecoration: "none",
                          borderBottom: "1.5px solid #ffe343",
                          marginRight: "0.3rem",
                        }}
                      >
                        9738981455
                      </a>
                      /
                      <a
                        href="tel:6362424401"
                        style={{
                          color: "#06182f",
                          fontWeight: "800",
                          textDecoration: "none",
                          borderBottom: "1.5px solid #ffe343",
                          marginLeft: "0.3rem",
                        }}
                      >
                        6362424401
                      </a>
                    </div>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#64748b",
                        fontWeight: "600",
                      }}
                    >
                      8 am - 8 pm
                    </span>
                  </div>

                  {/* Form or Success State */}
                  {submitted ? (
                    <div
                      style={{
                        background: "#ecfdf5",
                        border: "2px solid #10b981",
                        borderRadius: "14px",
                        padding: "1.5rem",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "52px",
                          height: "52px",
                          borderRadius: "50%",
                          background: "#10b981",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.8rem",
                          margin: "0 auto 1rem auto",
                        }}
                      >
                        ✓
                      </div>
                      <h3
                        style={{
                          margin: "0 0 0.5rem 0",
                          color: "#065f46",
                          fontSize: "1.35rem",
                          fontWeight: "800",
                        }}
                      >
                        Thank You!
                      </h3>
                      <p
                        style={{
                          margin: "0 0 1.25rem 0",
                          color: "#047857",
                          fontSize: "0.95rem",
                          lineHeight: "1.55",
                        }}
                      >
                        Your admission enquiry for Wisdom Jyoti has been received. Our team will contact you shortly on <strong>{form.phone || "your number"}</strong>.
                      </p>
                      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                        <button
                          onClick={handleReset}
                          style={{
                            padding: "0.6rem 1.2rem",
                            borderRadius: "999px",
                            border: "2px solid #065f46",
                            background: "transparent",
                            color: "#065f46",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: "0.88rem",
                          }}
                        >
                          Submit Another Enquiry
                        </button>
                        <button
                          onClick={onClose}
                          style={{
                            padding: "0.6rem 1.4rem",
                            borderRadius: "999px",
                            border: "none",
                            background: "#065f46",
                            color: "#ffffff",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: "0.88rem",
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      style={{
                        display: "grid",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                          gap: "1rem",
                        }}
                      >
                        <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                          Parent's Name *
                          <input
                            type="text"
                            name="parentName"
                            value={form.parentName}
                            onChange={handleChange}
                            placeholder="Your full name"
                            style={{
                              padding: "0.75rem 0.95rem",
                              borderRadius: "10px",
                              border: errors.parentName ? "2px solid #ef1118" : "2px solid #e2e8f0",
                              boxShadow: errors.parentName ? "0 0 0 3px rgba(239,17,24,0.12)" : "none",
                              fontSize: "16px",
                              outline: "none",
                              color: "#0f172a",
                            }}
                          />
                          {errors.parentName && (
                            <span style={{ color: "#ef1118", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0", textTransform: "none", marginTop: "2px" }}>
                              ⚠ {errors.parentName}
                            </span>
                          )}
                        </label>

                        <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                          Child's Name *
                          <input
                            type="text"
                            name="childName"
                            value={form.childName}
                            onChange={handleChange}
                            placeholder="Child's name"
                            style={{
                              padding: "0.75rem 0.95rem",
                              borderRadius: "10px",
                              border: errors.childName ? "2px solid #ef1118" : "2px solid #e2e8f0",
                              boxShadow: errors.childName ? "0 0 0 3px rgba(239,17,24,0.12)" : "none",
                              fontSize: "16px",
                              outline: "none",
                              color: "#0f172a",
                            }}
                          />
                          {errors.childName && (
                            <span style={{ color: "#ef1118", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0", textTransform: "none", marginTop: "2px" }}>
                              ⚠ {errors.childName}
                            </span>
                          )}
                        </label>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                          gap: "1rem",
                        }}
                      >
                        <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                          Phone Number *
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            style={{
                              padding: "0.75rem 0.95rem",
                              borderRadius: "10px",
                              border: errors.phone ? "2px solid #ef1118" : "2px solid #e2e8f0",
                              boxShadow: errors.phone ? "0 0 0 3px rgba(239,17,24,0.12)" : "none",
                              fontSize: "16px",
                              outline: "none",
                              color: "#0f172a",
                            }}
                          />
                          {errors.phone && (
                            <span style={{ color: "#ef1118", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0", textTransform: "none", marginTop: "2px" }}>
                              ⚠ {errors.phone}
                            </span>
                          )}
                        </label>

                        <div style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                          <span>Program of Interest</span>
                          <Dropdown
                            name="program"
                            value={form.program}
                            onChange={handleChange}
                            options={programs.filter((p) => !p.title.toLowerCase().includes("evening"))}
                          />
                        </div>
                      </div>

                      <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                        Email (Optional)
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          style={{
                            padding: "0.75rem 0.95rem",
                            borderRadius: "10px",
                            border: "2px solid #e2e8f0",
                            fontSize: "16px",
                            outline: "none",
                            color: "#0f172a",
                          }}
                        />
                      </label>

                      <label style={{ display: "grid", gap: "0.35rem", fontSize: "0.88rem", fontWeight: "700", color: "#334155" }}>
                        Message / Questions
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Child's age, preferred timing, or questions"
                          rows="3"
                          style={{
                            padding: "0.75rem 0.95rem",
                            borderRadius: "10px",
                            border: "2px solid #e2e8f0",
                            fontSize: "16px",
                            outline: "none",
                            color: "#0f172a",
                            resize: "vertical",
                          }}
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          marginTop: "0.5rem",
                          padding: "0.9rem 1.6rem",
                          borderRadius: "999px",
                          border: "none",
                          backgroundColor: loading ? "#94a3b8" : "#ef1118",
                          color: "#ffffff",
                          fontSize: "1rem",
                          fontWeight: "800",
                          cursor: loading ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          boxShadow: loading ? "none" : "0 4px 14px rgba(239, 17, 24, 0.35)",
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 18px rgba(239, 17, 24, 0.45)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 14px rgba(239, 17, 24, 0.35)";
                          }
                        }}
                      >
                        {loading ? "Submitting Enquiry..." : (
                          <>
                            Submit Enquiry <span>→</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default EnquiryDialog;
