export const mediaServerUrl = [
  "http://34.121.167.58:8088/janus",
  "ws://34.121.167.58:8188/",
];
export const backServerUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080";
