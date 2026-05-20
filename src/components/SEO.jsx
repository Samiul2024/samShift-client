import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "SamShift - Parcel Delivery System",
  description = "Send parcels, track deliveries, manage riders with SamShift.",
  keywords = "parcel delivery Bangladesh, courier service, logistics system",
  url = "https://your-domain.vercel.app",
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Md. Samiulla Hossen" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;