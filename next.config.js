/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['gsap'])
const withImages = require('next-images');

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = withTM(withImages({
  images: {
    disableStaticImages: true,
  },
}))
