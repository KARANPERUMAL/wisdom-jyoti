import React, { useState, createContext, useContext, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const MorphingDialogContext = createContext(null);

export function MorphingDialog({ children, transition, isOpen: externalIsOpen, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();

  const open = externalIsOpen !== undefined ? externalIsOpen : isOpen;
  const setOpen = (val) => {
    if (onOpenChange) onOpenChange(val);
    if (externalIsOpen === undefined) setIsOpen(val);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <MorphingDialogContext.Provider
      value={{
        isOpen: open,
        setIsOpen: setOpen,
        uniqueId,
        transition: transition || { type: "spring", stiffness: 200, damping: 24 },
      }}
    >
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({ children, className, style, onClick }) {
  const { setIsOpen, uniqueId } = useContext(MorphingDialogContext);

  return (
    <motion.div
      layoutId={`dialog-trigger-${uniqueId}`}
      onClick={(e) => {
        if (onClick) onClick(e);
        setIsOpen(true);
      }}
      className={cn("cursor-pointer", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogContainer({ children }) {
  const { isOpen, setIsOpen } = useContext(MorphingDialogContext);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="morphing-dialog-portal-root"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              zIndex: 999999,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1000000,
              width: "100%",
              maxWidth: "600px",
              maxHeight: "88vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function MorphingDialogContent({ children, className, style }) {
  const { uniqueId, transition } = useContext(MorphingDialogContext);

  return (
    <motion.div
      layoutId={`dialog-trigger-${uniqueId}`}
      transition={transition}
      className={cn(
        "relative w-full bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left",
        className
      )}
      style={{
        borderRadius: "20px",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        width: "100%",
        maxHeight: "85vh",
        position: "relative",
        zIndex: 1000001,
        ...style,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogImage({ src, alt, className, style }) {
  const { uniqueId } = useContext(MorphingDialogContext);
  return (
    <motion.img
      layoutId={`dialog-image-${uniqueId}`}
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      style={style}
    />
  );
}

export function MorphingDialogTitle({ children, className, style }) {
  const { uniqueId } = useContext(MorphingDialogContext);
  return (
    <motion.h3
      layoutId={`dialog-title-${uniqueId}`}
      className={cn("font-bold text-gray-900 dark:text-white", className)}
      style={style}
    >
      {children}
    </motion.h3>
  );
}

export function MorphingDialogSubtitle({ children, className, style }) {
  const { uniqueId } = useContext(MorphingDialogContext);
  return (
    <motion.p
      layoutId={`dialog-subtitle-${uniqueId}`}
      className={cn("text-gray-500 dark:text-gray-400", className)}
      style={style}
    >
      {children}
    </motion.p>
  );
}

export function MorphingDialogClose({ className }) {
  const { setIsOpen } = useContext(MorphingDialogContext);
  return (
    <button
      onClick={() => setIsOpen(false)}
      className={cn(
        "morphing-dialog-close-btn absolute top-4 right-4 z-20 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors",
        className
      )}
      style={{
        position: "absolute",
        top: "1rem",
        right: "1rem",
        zIndex: 1000005,
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: "none",
        background: "rgba(0,0,0,0.12)",
        color: "#0f172a",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}
      aria-label="Close dialog"
    >
      ✕
    </button>
  );
}
