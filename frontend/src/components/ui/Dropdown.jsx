import React, { useState, useRef, useEffect } from "react";

export function Dropdown({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  className = "",
  variant = "default", // "default" | "contact"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value || opt.title === value);
  const displayLabel = selectedOption
    ? selectedOption.label || (selectedOption.age ? `${selectedOption.title} (${selectedOption.age})` : selectedOption.title)
    : placeholder;

  const handleSelect = (optVal) => {
    if (onChange) {
      onChange({ target: { name, value: optVal } });
    }
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? "dropdown-open" : ""} ${className}`}
      style={{ position: "relative", width: "100%" }}
    >
      <div
        tabIndex={0}
        role="button"
        className="btn dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        style={
          variant === "contact"
            ? {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.95rem 1rem",
                borderRadius: 0,
                border: isOpen
                  ? "2px solid #ef1118"
                  : "2px solid rgba(6, 24, 47, 0.22)",
                backgroundColor: "rgba(255, 255, 255, 0.82)",
                color: "#06182f",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                boxSizing: "border-box",
                userSelect: "none",
                letterSpacing: 0,
                transition: "border-color 150ms ease, box-shadow 150ms ease",
                boxShadow: isOpen
                  ? "0 0 0 0.22rem rgba(239, 17, 24, 0.12)"
                  : "none",
              }
            : {
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 0.95rem",
                borderRadius: "10px",
                border: "2px solid #e2e8f0",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                fontSize: "0.95rem",
                fontWeight: "700",
                cursor: "pointer",
                boxSizing: "border-box",
                userSelect: "none",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                borderColor: isOpen ? "#06182f" : "#e2e8f0",
                boxShadow: isOpen ? "0 0 0 3px rgba(6, 24, 47, 0.08)" : "none",
              }
        }
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {displayLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            marginLeft: "0.5rem",
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <ul
          tabIndex={-1}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-full p-2 shadow-md"
          style={{
            position: "absolute",
            top: "calc(100% + 0.4rem)",
            left: 0,
            width: "100%",
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            boxShadow: "0 14px 30px rgba(6, 24, 47, 0.16), 0 4px 8px rgba(6, 24, 47, 0.08)",
            border: "1.5px solid #e2e8f0",
            padding: "0.45rem",
            margin: 0,
            listStyle: "none",
            zIndex: 99999,
            maxHeight: "260px",
            overflowY: "auto",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {options.map((opt) => {
            const optVal = opt.value || opt.title;
            const optLabel = opt.label || (opt.age ? `${opt.title} (${opt.age})` : opt.title);
            const isSelected = optVal === value;

            return (
              <li key={optVal} style={{ listStyle: "none" }}>
                <button
                  type="button"
                  onClick={() => handleSelect(optVal)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "8px",
                    border: "none",
                    background: isSelected ? "#ffe343" : "transparent",
                    color: isSelected ? "#06182f" : "#1e293b",
                    fontSize: "0.92rem",
                    fontWeight: isSelected ? "800" : "600",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "#f1f5f9";
                      e.currentTarget.style.color = "#ef1118";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#1e293b";
                    }
                  }}
                >
                  <span>{optLabel}</span>
                  {isSelected && (
                    <span style={{ fontWeight: "900", color: "#06182f" }}>✓</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
