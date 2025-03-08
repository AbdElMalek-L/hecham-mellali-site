/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/hecham-mellali-site/' : '',
  images: {
    unoptimized: true,
  },
  output: 'export',
};
