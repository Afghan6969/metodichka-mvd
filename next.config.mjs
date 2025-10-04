/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Добавьте эту строку
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader',
    });
    if (!isServer) {
      config.resolve.alias['bcrypt'] = false;
      config.resolve.alias['@mapbox/node-pre-gyp'] = false;
    }
    return config;
  },
};

export default nextConfig;