module.exports = {
  webpack: (config, { webpack }) => {
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({ adapter: ["webrtc-adapter", "default"] }),
    ];
    config.module.rules.push({
      test: require.resolve("janus-gateway"),
      loader: "exports-loader",
      options: {
        exports: "Janus",
      },
    });
    return config;
  },
};
