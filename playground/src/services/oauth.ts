export const CLIENT_ID = "2cfc3840b7688f933dc217ba110ef6ca";
export const REDIRECT_URI = "https://localhost:3000/login/register";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,gender,talk_message`;