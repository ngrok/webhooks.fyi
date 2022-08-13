const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  env: {
    NEXT_PUBLIC_DOCSEARCH_APP_ID: "RYVBZO8R7U",
    NEXT_PUBLIC_DOCSEARCH_API_KEY: "af9265c82b63d7e721c1884a1bd12341",
    NEXT_PUBLIC_DOCSEARCH_INDEX_NAME: "webhooks"
  },
}

module.exports = withMarkdoc()(nextConfig)
