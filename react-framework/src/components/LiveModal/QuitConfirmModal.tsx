export default function QuitConfirmModal() {
    return (
        <div className="absolute bottom-[-14px] w-screen h-screen bg-black/50">
            <div className="w-[328px] h-131 absolute rounded-15 top-1/2 left-1/2 ml-[-164px] bg-white">
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