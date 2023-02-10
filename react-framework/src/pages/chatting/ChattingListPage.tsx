import Notice from "@/components/Chatting/Notice"
import ListCard from "@/components/Chatting/ListCard"
import basketball from "@/assets/profiles/team-basketball.png"
import basketball2 from "@/assets/profiles/team-basketball2.png"
import autoMatchfootball from "@/assets/profiles/auto-match-football.png"
import autoMatchBasketball from "@/assets/profiles/auto-match-basketball.png"
import autoMatchBadminton from "@/assets/profiles/auto-match-badminton.png"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setTabName } from "@/stores/tab/tabName"

export default function ChattingListPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTabName('채팅 목록'))
    }, [])

    return (
        <div className="flex flex-col h-auto">
            <Notice title="오늘 운동은 어떠셨나요?" content="팀원들에게 격려의 메세지를 남겨주세요!" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={6} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball2} title="대전농구팀" personnel={8} latestMsg="오늘 슬램덩크 팀과 대결 있습니다." />
            <ListCard roomProfile={autoMatchfootball} title="01-16축구" personnel={22} latestMsg={"매칭이 완료되었습니다!"} />
            <ListCard roomProfile={autoMatchBadminton} title="01-17배드민턴" personnel={2} latestMsg="매칭이 완료되었습니다!" />
            <ListCard roomProfile={autoMatchBasketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={6} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball2} title="대전농구팀" personnel={8} latestMsg="오늘 슬램덩크 팀과 대결 있습니다." />
            <ListCard roomProfile={autoMatchfootball} title="01-16축구" personnel={22} latestMsg={"매칭이 완료되었습니다!"} />
            <ListCard roomProfile={autoMatchBadminton} title="01-17배드민턴" personnel={2} latestMsg="매칭이 완료되었습니다!" />
            <ListCard roomProfile={autoMatchBasketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={6} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball2} title="대전농구팀" personnel={8} latestMsg="오늘 슬램덩크 팀과 대결 있습니다." />
            <ListCard roomProfile={autoMatchfootball} title="01-16축구" personnel={22} latestMsg={"매칭이 완료되었습니다!"} />
            <ListCard roomProfile={autoMatchBadminton} title="01-17배드민턴" personnel={2} latestMsg="매칭이 완료되었습니다!" />
            <ListCard roomProfile={autoMatchBasketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
        </div>
    )
}