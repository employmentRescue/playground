import { useLocation } from "react-router-dom";
import { CLIENT_ID, REDIRECT_URI } from "@/services/oauth"
import { useEffect } from "react";

export function oauthRedirectHandler() {
    const location = useLocation();
    const CODE_PARAM = location.search.split('=')[1];
    console.log(CODE_PARAM)
    const GRANT_TYPE = "authorization_code"
    const KAKAO_AUTH_TOKEN_URL = `grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code=${CODE_PARAM}`

    const getKakaoToken = () => {
        fetch(`https://kauth.kakao.com/oauth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: KAKAO_AUTH_TOKEN_URL
        })
            .then(response => {
                console.log(response)
                response.json
            })
    }
    useEffect(() => {
        if (!location.search) return;
        getKakaoToken();
    }, [])
}