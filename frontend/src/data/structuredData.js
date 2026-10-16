/**
 * Structured Data (Schema.org) configuration for Wisdom Jyoti Preschool.
 * Standardizes valid JSON-LD graph connecting Preschool, WebSite, and WebPage entities.
 */

export const SITE_URL = "https://wisdom-jyoti.vercel.app";
export const BUSINESS_NAME = "Wisdom Jyoti Preschool & Skill Development Center";
export const BUSINESS_SHORT_NAME = "Wisdom Jyoti Preschool";

export const BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "274, 2nd Main Rd, West of Chord Road 2nd Stage, Mahalakshmipuram",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  postalCode: "560086",
  addressCountry: "IN",
};

export const BUSINESS_PHONES = ["+919738981455", "+916362424401"];
export const BUSINESS_EMAIL = "karanperumaln@gmail.com";
export const BUSINESS_LOGO = `${SITE_URL}/og/og-home.webp`;

/**
 * Generates a Schema.org @graph payload with:
 * 1. Preschool (LocalBusiness & EducationalOrganization)
 * 2. WebSite (linked to Preschool as publisher)
 * 3. WebPage (linked to WebSite as isPartOf and Preschool as about)
 */
export function generateStructuredData({ title, description, canonicalUrl }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Preschool",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS_NAME,
        alternateName: BUSINESS_SHORT_NAME,
        url: `${SITE_URL}/`,
        logo: BUSINESS_LOGO,
        image: BUSINESS_LOGO,
        telephone: BUSINESS_PHONES,
        email: BUSINESS_EMAIL,
        address: BUSINESS_ADDRESS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: BUSINESS_SHORT_NAME,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description: description,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en",
      },
    ],
  };
}
