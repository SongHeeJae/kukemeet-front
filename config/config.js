export const mediaServerUrl =
  process.env.NODE_ENV === "production"
    ? ["https://media.kukemeet.com/janus"]
    : ["http://media.kukemeet.com/janus"];
export const backServerUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.kukemeet.com"
    : "http://localhost:8080/";
export const kakaoClientId = "5525448da0e0b0e8a6d67389d6cd1565";

export const kakaoRedirectUri =
  process.env.NODE_ENV === "production"
    ? "https://kukemeet.com/register-provider?provider=kakao"
    : "http://localhost:3000/register-provider?provider=kakao";
