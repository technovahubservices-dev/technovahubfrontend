import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT } from "../data/company";

const SITE_NAME = "TechnovaHub";
const SITE_URL = "https://technovahub.in";
const SITE_DESCRIPTION =
  "TechnovaHub builds AI automation, software products, and hands-on training that help businesses and learners work faster.";

const ROUTE_META = [
  {
    match: /^\/$/,
    title: "TechnovaHub | AI Automation, Software & Training",
    description:
      "Explore TechnovaHub for AI automation, software solutions, training programs, and practical digital products built for growth.",
  },
  {
    match: /^\/about$/,
    title: "About TechnovaHub | AI, Software, and Training",
    description:
      "Learn about TechnovaHub, a technology company focused on AI automation, software delivery, and industry-ready training.",
  },
  {
    match: /^\/courses$/,
    title: "Courses | TechnovaHub AI, Software & Tech Training",
    description:
      "Browse hands-on courses in AI, Python, full stack development, cloud computing, cybersecurity, and more.",
  },
  {
    match: /^\/contact$/,
    title: "Contact TechnovaHub | Talk to Our Team",
    description:
      "Get in touch with TechnovaHub for AI automation, software projects, training programs, and business support.",
  },
  {
    match: /^\/gallery$/,
    title: "Gallery | TechnovaHub Projects and Events",
    description:
      "See TechnovaHub workshops, training highlights, project work, and event moments from the team.",
  },
  {
    match: /^\/softwaresolutions$/,
    title: "Software Solutions | TechnovaHub",
    description:
      "Discover custom software, automation systems, dashboards, and business tools from TechnovaHub.",
  },
  {
    match: /^\/product\/.+$/,
    title: "Products | TechnovaHub AI and Automation",
    description:
      "Explore TechnovaHub products built for automation, communication, productivity, and business growth.",
  },
  {
    match: /^\/career\/.+$/,
    title: "Career Programs | TechnovaHub",
    description:
      "Explore career-focused learning and development programs from TechnovaHub.",
  },
  {
    match: /^\/7Days-AI-innovation$/,
    title: "7 Days AI Innovation | TechnovaHub",
    description:
      "Join the 7 Days AI Innovation program by TechnovaHub to build practical AI skills and project experience.",
  },
  {
    match: /^\/young-innovator$/,
    title: "Young Innovator | TechnovaHub",
    description:
      "Discover the Young Innovator program from TechnovaHub for creative learners and future builders.",
  },
];

const getMetaForPath = (pathname) => {
  const entry = ROUTE_META.find(({ match }) => match.test(pathname));
  if (entry) return entry;
  return {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  };
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertJsonLd = (id, value) => {
  let element = document.head.querySelector(`script[data-seo-id="${id}"]`);
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seoId = id;
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(value);
};

const seohead = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const meta = getMetaForPath(pathname);
    const canonicalUrl = new URL(pathname, SITE_URL).toString();
    const imageUrl = `${SITE_URL}/LOGO.jpg`;
    const isNoIndexRoute = pathname.startsWith("/admin") || pathname === "/verifyCertificate";

    document.documentElement.lang = "en";
    document.title = meta.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: meta.description,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: isNoIndexRoute
        ? "noindex,nofollow"
        : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    });
    upsertMeta('meta[name="theme-color"]', {
      name: "theme-color",
      content: "#2563eb",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: meta.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: meta.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });
    upsertMeta('meta[name="author"]', {
      name: "author",
      content: SITE_NAME,
    });
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    upsertJsonLd("website", {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    });

    upsertJsonLd("organization", {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: imageUrl,
      description: SITE_DESCRIPTION,
      telephone: [CONTACT.phone1, CONTACT.phone2],
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "No.48 Lawspet Main Road",
        addressLocality: "Puducherry",
        postalCode: "605008",
        addressCountry: "IN",
      },
    });
  }, [location.pathname]);

  return null;
};

export default seohead;
