import Notice from "@/components/Chatting/Notice"
import ListCard from "@/components/Chatting/ListCard"
import basketball from "@/assets/profiles/team-basketball.png"

export default function ChattingListPage() {
    return (
        <div className="flex flex-col h-full">
            <Notice title="오늘 운동은 어떠셨나요?" content="팀원들에게 격려의 메세지를 남겨주세요!" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
            <ListCard roomProfile={basketball} title="슬램덩크" personnel={2} latestMsg="오늘 저녁 농구 ㄱ?" />
        </div>
    )
}