import JoinButton from './JoinButton'
import exit from '@/assets/icons/exit.png'

export default function Register() {
    return (
        <div className="w-[322px] h-[265px] z-10 absolute left-1/2 ml-[-161px] bottom-14 rounded-15 bg-white flex flex-col items-center justify-center">
            <div className="w-full flex h-18 mt-14">
                <div className="ml-110 text-15">실시간 운동 등록</div>
                <img className="ml-auto mr-24 mt-5 w-10 h-10" src={exit}></img>
            </div>
            <div className="w-full h-20 mt-24"></div>
            <textarea className="w-[284px] h-80 mt-12 bg-gray-600 text-gray-700 pl-15 pt-11 rounded-5" placeholder='하고 싶은 말을 작성하세요.'></textarea>
            <div className="w-full h-22 mt-14 mb-17 flex">

            </div>
            <JoinButton>참여하기</JoinButton>
        </div>

    )

}