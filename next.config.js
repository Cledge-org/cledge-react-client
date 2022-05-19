/** @type {import('next').NextConfig} */
require("dotenv").config();
const regexEqual = (x, y) => {
  return (
    x instanceof RegExp &&
    y instanceof RegExp &&
    x.source === y.source &&
    x.global === y.global &&
    x.ignoreCase === y.ignoreCase &&
    x.multiline === y.multiline
  );
};
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
    AZURE_TENANT_NAME: process.env.AZURE_TENANT_NAME,
    AZURE_TENANT_GUID: process.env.AZURE_TENANT_GUID,
    USER_FLOW_AUTH: process.env.USER_FLOW_AUTH,
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  },
  webpack: (config) => {
    const oneOf = config.module.rules.find(
      (rule) => typeof rule.oneOf === "object"
    );
    if (oneOf) {
      const moduleCssRule = oneOf.oneOf.find((rule) =>
        regexEqual(rule.test, /\.module\.scss$/)
      );
      if (moduleCssRule) {
        const cssLoader = moduleCssRule.use.find(({ loader }) =>
          loader.includes("sass-loader")
        );
        if (cssLoader) {
          cssLoader.options.modules.mode = "local";
        }
      }
    }
    return config;
  },
};
