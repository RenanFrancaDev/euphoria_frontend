// next.config.js
const removeImports = require("next-remove-imports")();
module.exports = removeImports({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
});
