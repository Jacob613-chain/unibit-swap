const withImages = require("next-images");
module.exports = withImages();

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: "build",
    output: "export",
};

module.exports = nextConfig;