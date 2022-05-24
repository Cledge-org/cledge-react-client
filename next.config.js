/** @type {import('next').NextConfig} */
require("dotenv").config();
const loaderUtils = require("loader-utils");
const isProd = process.env.NODE_ENV === "production";
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

/**
 * Generate context-aware class names when developing locally
 */
const localIdent = (loaderContext, localIdentName, localName, options) => {
  return (
    loaderUtils
      .interpolateName(loaderContext, `[folder]_[name]__${localName}`, options)
      // Webpack name interpolation returns `about_about.module__root` for
      // `.root {}` inside a file named `about/about.module.css`. Let's simplify
      // this.
      .replace(/\.module_/, "_")
      // Replace invalid symbols with underscores instead of escaping
      // https://mathiasbynens.be/notes/css-escapes#identifiers-strings
      .replace(/[^a-zA-Z0-9-_]/g, "_")
      // "they cannot start with a digit, two hyphens, or a hyphen followed by a digit [sic]"
      // https://www.w3.org/TR/CSS21/syndata.html#characters
      .replace(/^(\d|--|-\d)/, "__$1")
  );
};

// Overrides for css-loader plugin
function cssLoaderOptions(modules) {
  const { getLocalIdent, ...others } = modules;
  return {
    ...others,
    getLocalIdent: isProd ? getLocalIdent : localIdent,
    exportLocalsConvention: "camelCaseOnly",
    mode: "local",
  };
}
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // sassOptions: {
  //   quietDeps: true,
  // },
  // webpack5: false,
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
      // Find the module which targets *.scss|*.sass files
      const moduleSassRule = oneOf.oneOf.find((rule) =>
        regexEqual(rule.test, /\.module\.(scss|sass)$/)
      );

      if (moduleSassRule) {
        // Get the config object for css-loader plugin
        const cssLoader = moduleSassRule.use.find(({ loader }) =>
          loader.includes("css-loader")
        );
        if (cssLoader) {
          cssLoader.options = {
            ...cssLoader.options,
            modules: cssLoaderOptions(cssLoader.options.modules),
          };
        }
      }
    }
    return config;
  },
};
