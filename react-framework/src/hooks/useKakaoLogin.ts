import axios from "axios";
import { useQuery } from "react-query"

const QUERY_KEY = "userInfo";
const SERVER_URL = "https://i8b309.p.ssafy.io:8080/oauth2/login/kakao"

export const useKakaoLogin = (LoginEnable: boolean, setLoginEnable: Function) => {
    return useQuery(QUERY_KEY, fetcher, { enabled: LoginEnable, onSuccess: () => setLoginEnable(!LoginEnable) })
}

const fetcher = () => 
  (
    axios.get(
      SERVER_URL
    )
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((error) => {
        console.log(error)
      })
  )