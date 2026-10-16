const fs = require("fs");
const path = require("path");

const DIST_DIR = path.resolve(__dirname, "../dist");
const BASE_TEMPLATE = path.join(DIST_DIR, "index.html");

const routes = [
  {
    path: "/",
    filename: "index.html",
    title: "Wisdom Jyoti Preschool in Mahalakshmipuram, Bengaluru",
    description:
      "Discover Wisdom Jyoti Preschool in Mahalakshmipuram, Bengaluru, offering Pre-Nursery, Nursery, Junior KG, Senior KG, Day Care and engaging early learning experiences.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/",
    image: "https://wisdom-jyoti.vercel.app/og/og-home.webp",
    imageType: "image/webp",
    imageWidth: 960,
    imageHeight: 960,
  },
  {
    path: "/about",
    filename: "about.html",
    dir: "about",
    title: "About Wisdom Jyoti Preschool & Skill Development Center",
    description:
      "Learn about Wisdom Jyoti Preschool & Skill Development Center, its child-focused learning approach, creative activities, early education programmes and Day Care.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/about",
    image: "https://wisdom-jyoti.vercel.app/og/og-about.webp",
    imageType: "image/webp",
    imageWidth: 736,
    imageHeight: 1349,
  },
  {
    path: "/programs",
    filename: "programs.html",
    dir: "programs",
    title:
      "Preschool Programs | Day Care, Nursery & Kindergarten | Wisdom Jyoti",
    description:
      "Explore early learning programs at Wisdom Jyoti Preschool in Bengaluru: Day Care, Pre-Nursery, Nursery, Junior KG, Senior KG and after-school evening classes.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/programs",
    image: "https://wisdom-jyoti.vercel.app/og/og-programs.webp",
    imageType: "image/webp",
    imageWidth: 960,
    imageHeight: 640,
  },
  {
    path: "/gallery",
    filename: "gallery.html",
    dir: "gallery",
    title: "Preschool Gallery | Wisdom Jyoti Preschool",
    description:
      "Explore the Wisdom Jyoti Preschool gallery featuring school life, classroom activities, creative learning moments, photos and videos.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/gallery",
    image: "https://wisdom-jyoti.vercel.app/og/og-gallery.jpg",
    imageType: "image/jpeg",
    imageWidth: 1280,
    imageHeight: 960,
  },
  {
    path: "/testimonials",
    filename: "testimonials.html",
    dir: "testimonials",
    title: "Why Preschool Matters | Wisdom Jyoti Preschool",
    description:
      "Discover how early childhood education helps children develop confidence, language skills, social connections and a strong foundation for future learning at Wisdom Jyoti Preschool.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/testimonials",
    image: "https://wisdom-jyoti.vercel.app/og/og-testimonials.jpg",
    imageType: "image/jpeg",
    imageWidth: 736,
    imageHeight: 1308,
  },
  {
    path: "/contact",
    filename: "contact.html",
    dir: "contact",
    title: "Contact Wisdom Jyoti Preschool | Bengaluru",
    description:
      "Contact Wisdom Jyoti Preschool in Mahalakshmipuram, Bengaluru, for admissions enquiries. Find our school location, contact numbers and programme information.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/contact",
    image: "https://wisdom-jyoti.vercel.app/og/og-contact.webp",
    imageType: "image/webp",
    imageWidth: 512,
    imageHeight: 512,
  },
  {
    path: "/404",
    filename: "404.html",
    dir: "404",
    title: "Page Not Found | Wisdom Jyoti Preschool",
    description:
      "The page you requested could not be found. Return to Wisdom Jyoti Preschool home page.",
    canonicalUrl: "https://wisdom-jyoti.vercel.app/404",
    image: "https://wisdom-jyoti.vercel.app/og/og-home.webp",
    imageType: "image/webp",
    imageWidth: 960,
    imageHeight: 960,
  },
];

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectMetadata(html, route) {
  // Strip any existing title, canonical, and OG/Twitter tags
  let cleaned = html
    .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<link[^>]*rel=["']canonical["'][^>]*\/?>/gi, "")
    .replace(/<meta[^>]*name=["']title["'][^>]*\/?>/gi, "")
    .replace(/<meta[^>]*name=["']description["'][^>]*\/?>/gi, "")
    .replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*\/?>/gi, "")
    .replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*\/?>/gi, "")
    .replace(/<!--\s*(?:Primary Meta Tags|Open Graph|Twitter)[^>]*-->/gi, "");

  const tags = [
    `    <title>${escapeHtml(route.title)}</title>`,
    `    <meta name="title" content="${escapeAttr(route.title)}" />`,
    `    <meta name="description" content="${escapeAttr(route.description)}" />`,
    `    <link rel="canonical" href="${escapeAttr(route.canonicalUrl)}" />`,
    ``,
    `    <!-- Open Graph / Facebook / WhatsApp -->`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="Wisdom Jyoti Preschool" />`,
    `    <meta property="og:url" content="${escapeAttr(route.canonicalUrl)}" />`,
    `    <meta property="og:title" content="${escapeAttr(route.title)}" />`,
    `    <meta property="og:description" content="${escapeAttr(route.description)}" />`,
    `    <meta property="og:image" content="${escapeAttr(route.image)}" />`,
    `    <meta property="og:image:secure_url" content="${escapeAttr(route.image)}" />`,
    `    <meta property="og:image:type" content="${escapeAttr(route.imageType)}" />`,
    `    <meta property="og:image:width" content="${route.imageWidth}" />`,
    `    <meta property="og:image:height" content="${route.imageHeight}" />`,
    `    <meta property="og:image:alt" content="${escapeAttr(route.title)}" />`,
    ``,
    `    <!-- Twitter / X -->`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:url" content="${escapeAttr(route.canonicalUrl)}" />`,
    `    <meta name="twitter:title" content="${escapeAttr(route.title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttr(route.description)}" />`,
    `    <meta name="twitter:image" content="${escapeAttr(route.image)}" />`,
  ].join("\n");

  // Inject right after viewport meta tag
  const viewportRegex = /(<meta\s+name=["']viewport["'][^>]*>)/i;
  if (viewportRegex.test(cleaned)) {
    return cleaned.replace(viewportRegex, `$1\n${tags}`);
  }

  // Fallback: inject right after <head>
  return cleaned.replace(/<head>/i, `<head>\n${tags}`);
}

function main() {
  if (!fs.existsSync(BASE_TEMPLATE)) {
    console.error("Error: base dist/index.html does not exist. Run vite build first.");
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(BASE_TEMPLATE, "utf-8");
  console.log(`[prerender] Read dist/index.html (${baseHtml.length} bytes)`);

  for (const route of routes) {
    const routeHtml = injectMetadata(baseHtml, route);

    if (route.dir) {
      const dirPath = path.join(DIST_DIR, route.dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const dirIndexPath = path.join(dirPath, "index.html");
      fs.writeFileSync(dirIndexPath, routeHtml, "utf-8");
      console.log(`[prerender] Wrote ${dirIndexPath} (${routeHtml.length} bytes)`);
    }

    const filePath = path.join(DIST_DIR, route.filename);
    fs.writeFileSync(filePath, routeHtml, "utf-8");
    console.log(`[prerender] Wrote ${filePath} (${routeHtml.length} bytes)`);
  }

  console.log(`[prerender] Successfully generated static metadata pages for ${routes.length} routes.`);
}

main();
