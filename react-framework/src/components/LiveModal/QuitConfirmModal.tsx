export default function QuitConfirmModal() {
    return (
        <div className="w-full h-full bg-black opacity-50">
            <div className="w-[328px] h-131 rounded-15 bg-white">
                <div></div>
                <div></div>
                <div className="flex">
                    <div className="text-16 text-gray-500">계속</div>
                    <div className="text-16 text-blue-700">취소</div>
                </div>
            </div>
        </div>
    )
}