/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Pages re-render on the server every morning and read Markdown from /content,
  // so make sure those files ship with the serverless functions.
  outputFileTracingIncludes: {
    "/**/*": ["./content/**/*"],
  },
};

export default nextConfig;
