export const mediaServerUrl =
  process.env.NODE_ENV === "production"
    ? ["https://media.kukemeet.kro.kr:8088/janus"]
    : ["http://media.kukemeet.kro.kr:8088/janus"];
export const backServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.kukemeet.kro.kr/"
    : "http://localhost:8080/";
