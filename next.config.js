/** @type {import('next').NextConfig} */
const nextConfig = {
  // env: {
  //   MAGENTO_GRAPHQL_ENDPOINT: process.env.MAGENTO_GRAPHQL_ENDPOINT,
  //   MAGENTO_BASE_URL: process.env.MAGENTO_BASE_URL,
  //   MAGENTO_BASE_MEDIA_URL: `${process.env.MAGENTO_BASE_URL}/pub/media`,
  //   MAGENTO_BASE_MEDIA_CATALOG_PRODUCT_URL: `${process.env.MAGENTO_BASE_URL}/media/catalog/product`,
  //   BASE_URL: process.env.BASE_URL,
  // },
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: new URL(process.env.MAGENTO_BASE_URL).hostname,
      // },
      // {
      //   protocol: "https",
      //   hostname: new URL(process.env.MAGENTO_BASE_URL).hostname,
      // },
      {
        protocol: "https",
        hostname: "dioutdoor.vn",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
