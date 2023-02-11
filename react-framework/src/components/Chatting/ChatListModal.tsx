import trashIcon from "@/assets/icons/trash-icon.png"
import notificationIcon from "@/assets/icons/notification.png"

import { useState, useEffect } from "react";
import NotificationToggleButton from "./NotificationToggleButton";

interface Iprops {
  showModal: boolean,
  setShowModal: any
}

export default function ChatListModal({ showModal, setShowModal }: Iprops) {

  const [notiTogggle, setNotiTogggle] = useState(false)

  const handleOnClickExit = () => {
    console.log("채팅방에서 나갔어요")
    setShowModal(!showModal)
  }

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div className="flex flex-col z-20" >
      <div className="flex justify-center w-[90%] h-[120px] self-center bg-white rounded-15 fixed right-[50%] translate-x-[50%] bottom-[10%] z-10" >
        <div className="flex flex-col w-[90%]">
          <div className="mt-15 mb-15 mx-30 w-46 h-3 text-16 self-center font-inter font-bold bg-[#DBDBDB]" onClick={() => setShowModal(!showModal)} />
          <div className="flex p-10 -mt-10">
            <img src={trashIcon} className="flex w-13 h-15 mt-2" />
            <p className="flex ml-15 mr-60 self-center font-bold text-15 font-inter tracking-tight" onClick={handleOnClickExit}>나가기</p>
          </div>
          <div className="flex p-10 justify-between">
            <div className="flex">
              <img src={notificationIcon} className="flex w-13 h-15 mt-2" />
              <p className="flex ml-15 font-bold text-15 font-inter tracking-tight">알림</p>
            </div>
            <div className="flex">
              <NotificationToggleButton notiTogggle={notiTogggle} setNotiTogggle={setNotiTogggle} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-black opacity-50 fixed bottom-0" onClick={() => setShowModal(!showModal)}></div>
    </div>
  )
}