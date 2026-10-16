import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollArea } from "../website/scroll-area";

/**
 * ProgramModal
 * Reusable modal dialog for displaying program details.
 * Matches the visual design and interaction pattern of ProgramCardItem.
 */
export function ProgramModal({ program, isOpen, onClose, onOpenEnquiry }) {
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

  if (typeof window === "undefined" || !program) return null;

  const handleEnquireClick = () => {
    onClose();
    if (onOpenEnquiry) {
      onOpenEnquiry();
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="program-modal-portal-root"
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
          role="dialog"
          aria-modal="true"
          aria-labelledby="program-modal-title"
        >
          {/* Backdrop Blur */}
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
                  background: "rgba(0, 0, 0, 0.08)",
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
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.16)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <ScrollArea className="h-full max-h-[88vh]">
                <div style={{ padding: "1.75rem clamp(1.2rem, 3.5vw, 2.2rem)" }}>
                  {/* Program Image */}
                  {program.image && (
                    <div
                      style={{
                        width: "100%",
                        maxHeight: "260px",
                        overflow: "hidden",
                        borderRadius: "14px",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <img
                        src={program.image}
                        alt={`${program.title} learning environment`}
                        style={{
                          width: "100%",
                          height: "240px",
                          objectFit: "cover",
                          borderRadius: "14px",
                          display: "block",
                        }}
                      />
                    </div>
                  )}

                  {/* Age Group Pill */}
                  <span
                    style={{
                      display: "inline-block",
                      background: "#fef3c7",
                      color: "#b45309",
                      padding: "0.3rem 0.85rem",
                      borderRadius: "999px",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Age Group: {program.age}
                  </span>

                  {/* Heading */}
                  <h2
                    id="program-modal-title"
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 1.85rem)",
                      fontWeight: "800",
                      color: "#0f172a",
                      margin: "0.3rem 0 0.4rem 0",
                      lineHeight: "1.2",
                    }}
                  >
                    {program.title}
                  </h2>

                  <p
                    style={{
                      fontSize: "1.02rem",
                      color: "#64748b",
                      marginBottom: "1.25rem",
                      lineHeight: "1.5",
                      marginTop: 0,
                    }}
                  >
                    {program.detail}
                  </p>

                  <div
                    style={{
                      borderTop: "1px solid #e2e8f0",
                      paddingTop: "1.25rem",
                      marginTop: "1rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "0.6rem",
                        marginTop: 0,
                      }}
                    >
                      Program Overview
                    </h3>
                    <p
                      style={{
                        fontSize: "0.96rem",
                        lineHeight: "1.65",
                        color: "#334155",
                        marginBottom: "1.5rem",
                        marginTop: 0,
                      }}
                    >
                      {program.description}
                    </p>

                    {/* Highlights */}
                    {program.highlights && program.highlights.length > 0 && (
                      <div style={{ marginBottom: "1.5rem" }}>
                        <h3
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: "700",
                            color: "#0f172a",
                            marginBottom: "0.75rem",
                            marginTop: 0,
                          }}
                        >
                          Key Highlights &amp; Activities
                        </h3>
                        <ul
                          style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "grid",
                            gap: "0.6rem",
                          }}
                        >
                          {program.highlights.map((item, i) => (
                            <li
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.6rem",
                                fontSize: "0.94rem",
                                color: "#475569",
                              }}
                            >
                              <span
                                style={{
                                  color: "#ef1118",
                                  fontWeight: "bold",
                                  fontSize: "1.1rem",
                                  lineHeight: 1,
                                }}
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer / Action Bar */}
                    <div
                      style={{
                        marginTop: "1.5rem",
                        paddingTop: "1.25rem",
                        borderTop: "1px dashed #cbd5e1",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                      }}
                    >
                      <div>
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                          Interested in {program.title}?
                        </p>
                        <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>
                          Wisdom Jyoti Preschool
                        </p>
                      </div>

                      {onOpenEnquiry ? (
                        <button
                          type="button"
                          onClick={handleEnquireClick}
                          style={{
                            background: "#ef1118",
                            color: "#fff",
                            padding: "0.7rem 1.5rem",
                            borderRadius: "999px",
                            border: "none",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: "0.92rem",
                            display: "inline-flex",
                            alignItems: "center",
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
                          Enquire Now <span>→</span>
                        </button>
                      ) : (
                        <Link
                          to="/contact"
                          onClick={onClose}
                          style={{
                            background: "#ef1118",
                            color: "#fff",
                            padding: "0.7rem 1.5rem",
                            borderRadius: "999px",
                            border: "none",
                            fontWeight: "700",
                            cursor: "pointer",
                            fontSize: "0.92rem",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            boxShadow: "0 4px 14px rgba(239, 17, 24, 0.3)",
                          }}
                        >
                          Enquire Now <span>→</span>
                        </Link>
                      )}
                    </div>
                  </div>
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

export default ProgramModal;
