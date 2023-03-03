/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    geoapifyKey : process.env.GEOAPIFY_API_KEY
  }
}

module.exports = nextConfig