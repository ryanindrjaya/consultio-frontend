/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  env: {
    ENV: "development",
    API_URL: process.env.API_URL,
  },
};
