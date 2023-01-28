const LOGIN_URL = "https://localhost:3000/login"

export default function LoginFailPage() {
    return (
        <div>
            <h1>로그인에 실패했어요ㅠㅠ</h1>
            <a href={LOGIN_URL}>다시 로그인하기</a>
        </div>
    )
}