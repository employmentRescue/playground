import quitIcon from '@/assets/icons/exit.png'

interface Iprops {
  setSportsType: (props: string) => void,
  setFilterModal: (props: string) => void,
}

export default function SportsTypeFilterModal({ setSportsType, setFilterModal }: Iprops) {
  const handleSportsTypeClick = (sportsType: string) => {
    setSportsType(sportsType);
    setFilterModal('gameType');
  }
  return (
    <div className="absolute w-full h-full bottom-0 bg-black/50 z-20">
      <div className="absolute w-full h-188 bottom-55 bg-white z-30">
        <img className="absolute w-10 h-10 top-18 right-18" src={quitIcon} onClick={() => setFilterModal('none')}></img>
        <div className="w-full h-47 text-15 border-b-1 border-gray-600 flex justify-center items-center">종목</div>
        <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('농구')}>농구</div>
        <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('축구')}>축구</div>
        <div className="w-full h-47 text-15 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('배드민턴')}>배드민턴</div>
      </div>
    </div>
  )
}