import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  canonicalUrl,
  keywords = "study timer, pomodoro, clock, productivity",
  ogImage = "/og-image.svg",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const location = useLocation();
  const siteOrigin = "https://studyclock.com";

  // Build absolute canonical from provided value or current route
  const computedCanonical = (() => {
    if (canonicalUrl) {
      // If caller passes a path like "/about", make absolute
      if (canonicalUrl.startsWith("http")) return canonicalUrl;
      return `${siteOrigin}${canonicalUrl}`.replace(/\/$/, "");
    }
    const path = location?.pathname ?? "/";
    return `${siteOrigin}${path}`.replace(/\/$/, "");
  })();

  // Ensure og image is absolute
  const computedOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteOrigin}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical Link */}
      <link rel="canonical" href={computedCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={computedCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={computedOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={computedCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={computedOgImage} />

      {/* Additional SEO tags */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
    </Helmet>
  );
};

export default SEO;
