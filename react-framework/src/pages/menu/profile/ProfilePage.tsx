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
        <div className="flex flex-col bg-[#EEF3FC] pt-[5%]">
            <ProfileModifyButton onClick={handleOnClick} isClicked={isClicked} className="w-50 h-26 mr-[5%] self-end bg-blue-700 text-12 text-white rounded-20 right-15" />
            {isClicked ? <ProfileModifyPage /> : <ProfileMainPage />}
        </div>
    )

}
