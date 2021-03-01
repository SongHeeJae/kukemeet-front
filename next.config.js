const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true,
  webpack: (config, { webpack }) => {
    const prod = process.env.NODE_ENV === "production";

    config.mode = prod ? "production" : "development";
    config.devtool = prod ? "hidden-source-map" : "eval";

    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({ adapter: ["webrtc-adapter", "default"] }),
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\ko$/),
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
});
