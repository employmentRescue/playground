function TabBar() {
    return (
        <div className="bg-[#bbc0ff] w-92 h-3 mx-6 mb-30 border-black">
        </div>
    )
}


export default function LoginRegisterTab() {
    return (
        <div className="flex h-90 w-full justify-center place-items-end">
            <div className="">
                <p className="font-inter text-center text-12">1. 개인정보</p>
                <TabBar />
            </div>
            <div>
                <p className="font-inter text-center text-12">2. 관심 운동</p>
                <TabBar />
            </div>
            <div>
                <p className="font-inter text-center text-12">3. 운동 레벨</p>
                <TabBar />
            </div>
        </div>
    )
}