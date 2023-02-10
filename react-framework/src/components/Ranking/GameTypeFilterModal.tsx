import quitIcon from '@/assets/icons/exit.png'

interface Iprops {
  setGameType: (props: string) => void,
  setFilterModal: (props: string) => void,
  sportsType: string
}

export default function GameTypeFilterModal({ setGameType, setFilterModal, sportsType }: Iprops) {
  const handleSportsTypeClick = (gameType: string) => {
    setGameType(gameType);
    setFilterModal('none');
  }
  return (
    <div className="absolute w-full h-screen top-[-55px] bg-black/50 z-20">
      <div className="fixed bottom-55 w-full bg-white z-30">
        <img className="absolute w-10 h-10 top-18 right-18" src={quitIcon} onClick={() => setFilterModal('none')}></img>
        <div className="w-full h-47 text-15 border-b-1 border-gray-600 flex justify-center items-center">게임 종류</div>
        {sportsType === '농구' &&
          <div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('3vs3')}>3 vs 3</div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('5vs5')}>5 vs 5</div>
          </div>}
        {sportsType === '축구' &&
          <div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('5vs5')}>5 vs 5</div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('6vs6')}>6 vs 6</div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('11vs11')}>11 vs 11</div>
          </div>}
        {sportsType === '배드민턴' &&
          <div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('1vs1')}>1 vs 1</div>
            <div className="w-full h-47 text-15 border-b-1 pl-17 border-gray-600 flex items-center" onClick={() => handleSportsTypeClick('2vs2')}>2 vs 2</div>
          </div>}
      </div>
    </div>
  )
}