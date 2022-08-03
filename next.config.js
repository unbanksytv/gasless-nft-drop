
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src', '__tests__'],
  },
  images: {
    loader: 'akamai',
    domains: ['gateway.ipfscdn.io'],
    path: '',
  },
}



module.exports = nextConfig
