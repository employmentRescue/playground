export default function MyTeamInfo() {
  return (
    <div className="w-[calc(100%-8px)] h-167 mt-49 ml-4 mr-4 border-t-4 border-blue-700 rounded-5 flex items-center bg-white">
      <div className="w-123 flex flex-col justify-center items-center ml-10">
        <div className="w-full h-30 "><div className="text-17 text-[#16b4f7] font-bold mt-6">1</div></div>
        <img className="w-70 h-70"></img>
        <div className="w-full h-67 flex flex-col justify-center items-center">
          <div className="text-15">슬램덩크</div>
        </div>
      </div>
      <div className="w-1 h-126 border-r-1 border-gray-600"></div>
      <div className="w-170 h-126 flex flex-col ml-20 justify-between mr-10">
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Current</div><div className="w-63 text-right text-17 font-bold text-blue-700">3승 2패</div>
        </div>
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Rating</div><div className="w-63 text-right text-17 font-bold text-blue-700">1324</div>
        </div>
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Total Wins</div><div className="w-63 text-right text-17 font-bold text-blue-700">22승</div>
        </div>
        <div className="flex justify-between">
          <div className="w-90 text-17 font-bold text-[#a3adb5]">Win Rate</div><div className="w-63 text-right text-17 font-bold text-blue-700">45.8%</div>
        </div>
      </div>
    </div>
  )
}