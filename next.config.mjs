/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {

    NEXT_PUBLIC_BASE_URL: "https://sanitractdev1.com/api/v1/",
    NEXT_PUBLIC_AUTH_URL: "https://sanitractdev1.com/api/",

    NEXT_PUBLIC_MSS_URL: "http://3.83.144.161/api/",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orionbucketlms.s3.us-east-1.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "orionbucketlms.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
