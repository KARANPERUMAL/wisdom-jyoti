import React from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogImage,
  MorphingDialogClose,
} from "./morphing-dialog";
import { ScrollArea } from "../website/scroll-area";

export function ProgramCardItem({ program, index, variant = "default", setPage }) {
  const cardClass = variant === "about" ? "program-detail-card yellow-hover-card" : "program-card premium-hover";

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 25,
      }}
    >
      <MorphingDialogTrigger className={cardClass} style={{ "--i": index }}>
        {program.image && (
          <MorphingDialogImage
            className="program-card-image"
            src={program.image}
            alt={`${program.title} learning environment`}
          />
        )}
        <MorphingDialogSubtitle className="program-age">{program.age}</MorphingDialogSubtitle>
        <MorphingDialogTitle className="program-title">{program.title}</MorphingDialogTitle>
        <span className="program-detail-text">{program.detail}</span>
        <div style={{ marginTop: "0.8rem", color: "#e11d48", fontWeight: "600", fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
          <span>Tap to view details</span>
          <span>→</span>
        </div>
      </MorphingDialogTrigger>

      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-w-xl w-full mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
          <MorphingDialogClose />
          <ScrollArea className="h-full max-h-[85vh]">
            <div className="p-6 md:p-8" style={{ padding: "1.75rem" }}>
              <div className="flex justify-center mb-6" style={{ width: "100%", maxHeight: "280px", overflow: "hidden", borderRadius: "14px", marginBottom: "1.25rem" }}>
                <MorphingDialogImage
                  src={program.image}
                  alt={program.title}
                  className="w-full h-64 object-cover rounded-xl"
                  style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "14px" }}
                />
              </div>

              <div>
                <span style={{ display: "inline-block", background: "#fef3c7", color: "#b45309", padding: "0.3rem 0.85rem", borderRadius: "999px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.5rem" }}>
                  Age Group: {program.age}
                </span>

                <MorphingDialogTitle style={{ fontSize: "1.8rem", fontWeight: "800", color: "#0f172a", margin: "0.4rem 0 0.4rem 0", lineHeight: "1.2" }}>
                  {program.title}
                </MorphingDialogTitle>

                <MorphingDialogSubtitle style={{ fontSize: "1.05rem", color: "#64748b", marginBottom: "1.25rem", fontStyle: "normal", lineHeight: "1.5" }}>
                  {program.detail}
                </MorphingDialogSubtitle>

                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem", marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
                    Program Overview
                  </h4>
                  <p style={{ fontSize: "0.98rem", lineHeight: "1.65", color: "#334155", marginBottom: "1.5rem" }}>
                    {program.description}
                  </p>

                  {program.highlights && program.highlights.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
                        Key Highlights &amp; Activities
                      </h4>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.6rem" }}>
                        {program.highlights.map((item, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.95rem", color: "#475569" }}>
                            <span style={{ color: "#e11d48", fontWeight: "bold", fontSize: "1.1rem" }}>✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div style={{ marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px dashed #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>Interested in {program.title}?</p>
                      <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: "700", color: "#0f172a" }}>Wisdom Jyoti Preschool</p>
                    </div>
                    {setPage && (
                      <button
                        onClick={() => {
                          setPage("contact");
                        }}
                        style={{
                          background: "#e11d48",
                          color: "#fff",
                          padding: "0.65rem 1.4rem",
                          borderRadius: "999px",
                          border: "none",
                          fontWeight: "700",
                          cursor: "pointer",
                          fontSize: "0.92rem",
                        }}
                      >
                        Enquire Now →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

export default ProgramCardItem;
