const webpack = require("webpack");
const path = require("path");
const withImages = require("next-images");

const isProd = process.env.NODE_ENV === "production";

const assetPrefix = isProd
  ? "https://gulshan.vercel.app"
  : "http://localhost:3000";

module.exports = withImages({
  env: {
    PUBLIC_URL: "",
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
