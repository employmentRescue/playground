interface NicknameCheckProps {
    nicknameCheck: () => void;
}

export default function NicknameCheckButton({nicknameCheck}: NicknameCheckProps) {
    return (
        <div>
            <button onClick={(e) => nicknameCheck()} className="w-64 h-26 rounded-5 bg-blue-700 text-12 mb-32 text-white font-inter justify-items-end">중복 확인</button>
        </div>
    )
}