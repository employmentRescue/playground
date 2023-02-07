import HeaderButton from "./HeaderButton"
import chatImage from "@/assets/icons/chat.png"
import notificationImage from "@/assets/icons/notification.png"
import NotificationModal from "../Notification/NotificationModal"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Header() {
    const [showModal, setShowModal] = useState(false);

    const handleOnClickShowModal = () => {
        setShowModal(!showModal)
    }

    const navigate = useNavigate();
    return (
        <div className="w-full h-55 border-b-1 border-gray-600 bg-white z-50 fixed top-0">
            <div className="w-full h-7 bg-blue-600"></div>
            <div className="w-full h-48 flex justify-between items-center">
                <div className="text-15 ml-14">PlayGround</div>
                <div className="flex flex-col w-52 h-20 mr-13">
                    <div className="flex justify-between">
                        <HeaderButton imgSrc={chatImage} onClick={() => navigate("/chatting")} className="w-20 h-20" />
                        <HeaderButton imgSrc={notificationImage} onClick={handleOnClickShowModal} className="w-20 h-20" />
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end overflow-hidden">
                {showModal && <NotificationModal onClickShowModal={handleOnClickShowModal} />}
            </div>
        </div>
    )
}