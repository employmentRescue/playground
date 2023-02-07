import ProfileModifyButton from "@/components/Profile/Buttons/ProfileModifyButton";
import { useState } from "react";
import ProfileMainPage from "./ProfileMainPage";
import ProfileModifyPage from "./ProfileModifyPage";

export default function ProfilePage() {
    const [isClicked, setIsClicked] = useState(false);

    function handleOnClick() {
        setIsClicked(!isClicked)
    }
    return (
        <div>
            <ProfileModifyButton onClick={handleOnClick} isClicked={isClicked} className="w-50 h-26 self-end bg-blue-700 text-12 text-white rounded-20 fixed top-80 right-15" />
            {isClicked ? <ProfileModifyPage /> : <ProfileMainPage />}
        </div>
    )

}
