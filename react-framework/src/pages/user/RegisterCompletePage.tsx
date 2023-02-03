import ChoiceCompoleteButton from "@/components/userRegister/Buttons/ChoiceCompleteButton"
import RegisterCompleteImg from "@/assets/icons/register-complete.png"

export default function RegisterCompletePage() {
  return (
    <div className="flex flex-col h-[calc(100vh)] justify-between">
      <div className="flex flex-col mt-130 self-center">
        <h1 className="font-inter text-20 font-bold text-center mb-20 tracking-tight">회원가입이 완료되었어요</h1>
        <h2 className="font-inter text-15 text-[#3B485B] tracking-tight">이제 사람들과 운동을 하러 가보세요</h2>
      </div>

      <img src={RegisterCompleteImg} className="w-[240px] mb-50 self-center" />

      <div className="self-center sticky bottom-0">
        <div className="self-center bg-gradient-to-t from-white pt-50" />
        <ChoiceCompoleteButton innerText="운동하러 가기" />
      </div>
    </div >
  )
}