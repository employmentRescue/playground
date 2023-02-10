import exitIcon from '@/assets/icons/exit.png'

export default function TeamMatchNotificationModal() {
  return (
    <div className="absolute w-full h-full bottom-0 bg-black/50 z-20">
      <div className="w-[304px] h-[389px] absolute rounded-15 top-1/2 left-1/2 ml-[-152px] mt-[-194px] overflow-hidden">
        <img className="w-10 h-10 absolute top-16 right-16" src={exitIcon}></img>
        <div className="w-full h-134 flex flex-col justify-center items-center bg-green-300">
          <img className="w-40 h-40"></img>
          <div className="text-15 mt-18">매칭이 완료되었습니다</div>
        </div>
        <div className="w-full h-[255px] bg-white">
          <div className="w-full h-196 flex flex-col items-center">
            <img className="w-100 h-100 mt-19"></img>
            <div className="text-15 mt-18">MUNKS</div>
            <div className="w-88 h-30 mt-5 flex justify-center items-center bg-yellow-200 rounded-10">GOLD 2</div>
          </div>
          <div className="w-full h-59">
            <div className="absolute bottom-17 right-13 text-16 text-blue-700">자세히 보기</div>
          </div>
        </div>
      </div>
    </div>
  )
}