import timeIcon from "@/assets/icons/time.png"
import placeIcon from "@/assets/icons/place.png"

export default function TeamMatchJoinPage() {
  return (
    <div className="w-full">
      <div className="w-full h-173 flex flex-col justify-center items-center bg-white">
        <img className="w-100 h-100"></img>
        <div className="text-20 mt-4">MUNKS</div>
      </div>

      <div className="w-full  h-[calc(100vh-290px)] bg-white mt-7 pt-30 pl-24 pr-24 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={timeIcon}></img>
              <div className="text-14">선호 시간대</div>
            </div>
            <div className="text-13">18:00 ~ 22:00</div>
          </div>
          <div className="flex justify-between items-center mt-14">
            <div className="flex items-center">
              <img className="w-20 h-20 mr-8" src={placeIcon}></img>
              <div className="text-14">선호 장소</div>
            </div>
            <div className="text-13">양천구 목동동로 111 양천공원</div>
          </div>
          <div className="w-full h-1 bg-gray-600 mt-24 mb-24 "></div>
          <div className="w-full flex justify-between items-center">
            <div className="text-15 font-bold">매칭 결과 입력</div>
            <div className="flex w-125 justify-between">
              <button className="w-35 h-25 rounded-5 border-1 border-blue-700 text-blue-700 text-12">승</button>
              <button className="w-35 h-25 rounded-5 border-1 border-blue-700 text-blue-700 text-12">무</button>
              <button className="w-35 h-25 rounded-5 border-1 border-blue-700 text-blue-700 text-12">패</button>
            </div>
          </div>
          <div className="mt-15 text-12 text-gray-700">상대가 매칭 결과를 입력하기 전입니다.</div>
        </div>
        <button className="w-full h-34 rounded-5 bg-blue-700 mr-6 text-15 text-white mb-15">매칭 신청하기</button>
      </div>
    </div>
  )
}