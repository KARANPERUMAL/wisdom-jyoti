import { galleryMedia } from "../../data/galleryMedia";

export function GalleryPage() {
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
          <figure
            className={`collage-tile image-${index + 1} ${item.className}`}
            key={item.src}
            data-reveal
          >
            {item.type === "video" ? (
              <>
                <span className="video-label">
                  Video {galleryMedia.slice(0, index + 1).filter((m) => m.type === "video").length}
                </span>
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

export default GalleryPage;
