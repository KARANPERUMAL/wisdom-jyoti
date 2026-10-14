import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { galleryMedia } from "../../data/galleryMedia";

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Filter media based on active tab
  const filteredMedia = galleryMedia.filter((item) => {
    if (activeFilter === "photos") return item.type === "image";
    if (activeFilter === "videos") return item.type === "video";
    return true;
  });

  const photoCount = galleryMedia.filter((m) => m.type === "image").length;
  const videoCount = galleryMedia.filter((m) => m.type === "video").length;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredMedia.length - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev < filteredMedia.length - 1 ? prev + 1 : 0));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, filteredMedia.length]);

  const currentItem = lightboxIndex !== null ? filteredMedia[lightboxIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredMedia.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < filteredMedia.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      {/* Playful Scrapbook Gallery Hero */}
      <section className="inner-hero gallery-hero">
        <div data-reveal>
          <div className="gallery-hero-badge">
            <span className="badge-sparkle">✨</span>
            <span>School Life &amp; Scrapbook</span>
          </div>
          <h2>Moments of Joy, Wonder &amp; Discovery.</h2>
          <p>
            A vibrant living collection of real classroom explorations, creative messy art,
            outdoor giggles, and memorable kindergarten milestones.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="page-section-v2 gallery-section">
        {/* Playful Filter Navigation */}
        <div className="gallery-toolbar" data-reveal>
          <div className="gallery-tabs">
            <button
              type="button"
              className={`gallery-tab-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <span className="tab-icon">🌟</span>
              <span>All Moments</span>
              <span className="tab-count">{galleryMedia.length}</span>
            </button>
            <button
              type="button"
              className={`gallery-tab-btn ${activeFilter === "photos" ? "active" : ""}`}
              onClick={() => setActiveFilter("photos")}
            >
              <span className="tab-icon">📸</span>
              <span>Photos</span>
              <span className="tab-count">{photoCount}</span>
            </button>
            <button
              type="button"
              className={`gallery-tab-btn ${activeFilter === "videos" ? "active" : ""}`}
              onClick={() => setActiveFilter("videos")}
            >
              <span className="tab-icon">🎬</span>
              <span>Videos</span>
              <span className="tab-count">{videoCount}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Scrapbook Media Grid */}
        <div className="gallery-scrapbook-grid" data-reveal>
          {filteredMedia.map((item, index) => {
            const isVideo = item.type === "video";

            return (
              <article
                key={item.id}
                className={`scrapbook-card ${isVideo ? "card-reel" : "card-polaroid"} ${
                  item.featured ? "is-featured" : ""
                }`}
                onClick={() => setLightboxIndex(index)}
              >
                {/* Cute Washi Tape Sticker for Polaroid cards */}
                {!isVideo && <div className="washi-tape" aria-hidden="true" />}

                {/* Media Container */}
                <div className="card-media-wrapper">
                  {isVideo ? (
                    <div className="video-card-container">
                      {/* Native video preview at 0.001s: genuine video frame, zero image posters */}
                      <video
                        preload="metadata"
                        muted
                        playsInline
                        className="reel-video-preview"
                      >
                        <source src={`${item.src}#t=0.001`} type="video/mp4" />
                      </video>

                      {/* Play Button Overlay */}
                      <div className="reel-play-overlay">
                        <div className="reel-play-btn" aria-label="Play video">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="6 4 20 12 6 20 6 4" />
                          </svg>
                        </div>
                        <span className="reel-play-label">Tap to Play</span>
                      </div>
                    </div>
                  ) : (
                    <div className="photo-card-container">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="polaroid-image"
                      />
                      <div className="photo-hover-tag">
                        <span>🔍 View</span>
                      </div>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="card-top-tags">
                    <span className={`tag-type ${isVideo ? "tag-video" : "tag-photo"}`}>
                      {isVideo ? "🎬 Video Story" : "📸 Photo"}
                    </span>
                    {item.tag && <span className="tag-topic">{item.tag}</span>}
                  </div>
                </div>

                {/* Bottom Caption Area */}
                <div className="card-caption-panel">
                  <h3 className="card-caption-title">{item.title}</h3>
                  <p className="card-caption-desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Full-Screen Centered Lightbox Portal (Rendered to document.body) */}
      {currentItem &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="gallery-portal-lightbox"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop Blur */}
            <div className="lightbox-backdrop-veil" />

            {/* Modal Dialog Content (Centered) */}
            <div
              className={`lightbox-cinema-box ${
                currentItem.type === "video" ? "cinema-reel-mode" : "cinema-photo-mode"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="lightbox-cinema-header">
                <div className="cinema-header-left">
                  <span className="cinema-counter-badge">
                    {lightboxIndex + 1} / {filteredMedia.length}
                  </span>
                  <span className="cinema-category-title">{currentItem.category}</span>
                </div>
                <button
                  className="cinema-close-button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label="Close Lightbox"
                >
                  ✕
                </button>
              </div>

              {/* Main Media Player / Image Stage */}
              <div className="lightbox-cinema-viewport">
                {currentItem.type === "video" ? (
                  <div className="cinema-video-holder">
                    <video
                      controls
                      autoPlay
                      playsInline
                      className="cinema-active-video"
                    >
                      <source src={currentItem.src} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                ) : (
                  <div className="cinema-photo-holder">
                    <img
                      src={currentItem.src}
                      alt={currentItem.title}
                      className="cinema-active-image"
                    />
                  </div>
                )}

                {/* Navigation Controls (Floating Arrows) */}
                <button
                  className="lightbox-arrow-btn arrow-prev"
                  onClick={handlePrev}
                  aria-label="Previous item"
                >
                  ❮
                </button>
                <button
                  className="lightbox-arrow-btn arrow-next"
                  onClick={handleNext}
                  aria-label="Next item"
                >
                  ❯
                </button>
              </div>

              {/* Caption Footer */}
              <div className="lightbox-cinema-footer">
                <h4>{currentItem.title}</h4>
                {currentItem.description && <p>{currentItem.description}</p>}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default GalleryPage;
