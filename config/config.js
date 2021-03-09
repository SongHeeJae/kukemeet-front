export const mediaServerUrl =
  process.env.NODE_ENV === "production"
    ? ["https://media.kukemeet.com/janus"]
    : ["http://media.kukemeet.com/janus"];
export const backServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.kukemeet.com/"
    : "http://localhost:8080/";
export const fileWebSocketUrl =
  process.env.NODE_ENV === "production"
    ? "https://"
    : "http://localhost:8090/file-stomp";
