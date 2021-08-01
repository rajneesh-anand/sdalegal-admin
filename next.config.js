const webpack = require("webpack");
const path = require("path");
const withImages = require("next-images");

const isProd = process.env.NODE_ENV === "production";

const assetPrefix = isProd
  ? "https://sdalegal-admin.vercel.app"
  : "http://localhost:3000";

const apiUrl = isProd
  ? "https://sdalegal.herokuapp.com/api"
  : "http://localhost:8080/api";

module.exports = withImages({
  env: {
    PUBLIC_URL: "",
    API_URL: apiUrl,
    baseUrl: assetPrefix,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./src"));
    return config;
  },
});
