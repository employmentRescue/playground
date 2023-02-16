import backButton from "@/assets/icons/back-button.png"
import { useState, useEffect } from "react";
import NotificationCard, { NotificationCardType } from "./NotificationCard";
import DefaultImage from "@/assets/icons/notification-default.png"
import TeamMatchImage from "@/assets/icons/notification-team-match.png"
import ChatImage from "@/assets/icons/notification-chat.png"

interface Iprops {
    onClickShowModal: () => void;
}

const initialCards: NotificationCardType[] = [
    {
        imgSrc: DefaultImage,
        title: "매칭",
        content: "매칭이 완료 되었습니다.",
        elapsedTime: "23분 전",
        isLatest: true,
        noticeCount: 1
    },
    {
        imgSrc: TeamMatchImage,
        title: "팀 매칭",
        content: "팀 매칭이 취소 되었습니다.",
        elapsedTime: "3시간 전",
        isLatest: false,
        noticeCount: 1
    },
    {
        imgSrc: ChatImage,
        title: "채팅",
        content: "새로운 채팅방이 생성 되었습니다.",
        elapsedTime: "1일 전",
        isLatest: false,
        noticeCount: 1
    },
]

export default function NotificationModal({ onClickShowModal }: Iprops) {

    const [cards, setCards] = useState(initialCards);

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

    const notificationCardsRendering = () => {
        let index = 0
        const Result = cards.map((card) => {
            index++;
            return (
                <NotificationCard
                    key={index}
                    imgSrc={card.imgSrc}
                    title={card.title}
                    content={card.content}
                    elapsedTime={card.elapsedTime}
                    isLatest={card.isLatest}
                    noticeCount={card.noticeCount}
                />
            )
        })
        return Result
    }
    return (
        <div className="flex">
            <div className="w-[280px] h-[400px] bg-white rounded-15 fixed right-0 top-55 z-50">
                <div className="flex justify-start">
                    <div className="pl-15 pr-10 py-20" >
                        <img src={backButton} className="w-15 h-15" />
                    </div>
                    <h1 className="mt-15 text-16  font-bold ">알림</h1>
                </div>
                <div>{notificationCardsRendering()}</div>
            </div>
            <div className="w-[100vh] h-[calc(100vh-110px)] bg-black opacity-50 fiexed top-55" onClick={onClickShowModal}></div>
        </div>
    )
}