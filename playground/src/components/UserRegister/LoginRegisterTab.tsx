import { useState } from "react"

function TabBar() {
    return (
        <div className="bg-[#bbc0ff] w-92 h-3 mx-6 border-black">
        </div>
    )
}


export default function LoginRegisterTab() {
    const [ tabColor1, setTabColor1 ] = useState("mt-30 mb-30")
    const [ tabColor2, setTabColor2 ] = useState("mt-30 mb-30")
    const [ tabColor3, setTabColor3 ] = useState("mt-30 mb-30")

    const isSelectedTab1 = () => {
        setTabColor1("bg-black")
        setTabColor2("bg-white")
        setTabColor3("bg-white")
    }
    const isSelectedTab2 = () => {
        setTabColor1("bg-white")
        setTabColor2("bg-black")
        setTabColor3("bg-white")
    }
    const isSelectedTab3 = () => {
        setTabColor1("bg-white")
        setTabColor2("bg-white")
        setTabColor3("bg-black")
    }

    return (
        <div className="flex w-full justify-center place-items-end">
            <div onClick={isSelectedTab1} className={tabColor1}>
                <p className="font-inter text-center text-12">1. 개인정보</p>
                <TabBar />
            </div>
            <div onClick={isSelectedTab2} className={tabColor2}>
                <p className="font-inter text-center text-12">2. 관심 운동</p>
                <TabBar />
            </div>
            <div onClick={isSelectedTab3} className={tabColor3}>
                <p className="font-inter text-center text-12">3. 운동 레벨</p>
                <TabBar />
            </div>
        </div>
    )
}