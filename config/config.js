export const mediaServerUrl =
  process.env.NODE_ENV === "production"
    ? ["https://media.kukemeet.kro.kr/janus"]
    : ["http://media.kukemeet.kro.kr/janus"];
export const backServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.kukemeet.kro.kr/"
    : "http://localhost:8080/";
