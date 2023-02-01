import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"

export default function RegisterCompletePage() {
  return (
    <div className="flex flex-col h-[calc(100vh-149px)] justify-between">
      <div className="flex flex-col mt-130 self-center">
        <h1 className="font-inter text-20 font-bold text-center mb-20 tracking-tight">회원가입이 완료되었어요
          <br />
          <span className="text-15 text-[#969696]">이제 사람들과 운동을 하러 가보세요</span>
        </h1>
      </div>

      <div className="self-center">
        <ChoiceCompoleteButton innerText="운동하러 가기"/>
      </div>
    </div>
  )
}