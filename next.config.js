/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    ARCGIS_API_KEY: process.env.ARCGIS_API_KEY,
  }
}
