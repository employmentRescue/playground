import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"

export default function FavoriteSportsTab() {
    return (
        <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
            <div className="flex flex-col mt-37 self-center">
                <h1 className="font-inter text-19 font-bold text-center">관심 운동을 선택해주세요</h1>
            </div>
            <div className="self-center">
                <ChoiceCompoleteButton />
            </div>
        </div>

    )
}