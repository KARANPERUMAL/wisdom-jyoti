import { Helmet } from "react-helmet-async";

export const SITE_URL =
  import.meta.env.VITE_SITE_URL || "https://wisdom-jyoti.vercel.app";
export const SITE_NAME = "Wisdom Jyoti Preschool";

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
