import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { generateStructuredData } from "../../data/structuredData";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://wisdom-jyoti.vercel.app";
export const SITE_NAME = "Wisdom Jyoti Preschool";

const IMAGE_META = {
  "/og/og-home.webp": { type: "image/webp", width: 960, height: 960 },
  "/og/og-about.webp": { type: "image/webp", width: 736, height: 1349 },
  "/og/og-programs.webp": { type: "image/webp", width: 960, height: 640 },
  "/og/og-gallery.jpg": { type: "image/jpeg", width: 1280, height: 960 },
  "/og/og-testimonials.jpg": { type: "image/jpeg", width: 736, height: 1308 },
  "/og/og-contact.webp": { type: "image/webp", width: 512, height: 512 },
};

/**
 * Standardized SEO and Social Sharing Head Component.
 * Integrates page-specific Open Graph, Twitter/X cards, and canonical URLs
 * using react-helmet-async.
 */
export function SEO({
  title,
  description,
  path = "/",
  image = "/og/og-home.webp",
  type = "website",
}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath === "/" ? "" : normalizedPath}`;
  const absoluteImageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  const imageDetails = IMAGE_META[image] || {
    type:
      image.endsWith(".jpg") || image.endsWith(".jpeg")
        ? "image/jpeg"
        : image.endsWith(".png")
        ? "image/png"
        : "image/webp",
    width: 1200,
    height: 630,
  };

  const structuredData = generateStructuredData({
    title,
    description,
    canonicalUrl,
  });

  useEffect(() => {
    let script = document.getElementById("schema-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "schema-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [canonicalUrl, title, description]);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta property="og:image:type" content={imageDetails.type} />
      <meta property="og:image:width" content={String(imageDetails.width)} />
      <meta property="og:image:height" content={String(imageDetails.height)} />
      <meta property="og:image:alt" content={title} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
    </Helmet>
  );
}

export default SEO;
