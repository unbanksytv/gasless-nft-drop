/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    domains: ['gateway.ipfscdn.io'],
    path: '',
  },
}



module.exports = nextConfig
