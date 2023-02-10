import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/pagination";
import MyTeamInfo from "@/components/Ranking/MyTeamInfo";
import TopRank from "@/components/Ranking/TopRank";
import RankInfo from "@/components/Ranking/RankInfo";
import SportsTypeFilterModal from "@/components/Ranking/SportsTypeFilterModal";
import GameTypeFilterModal from "@/components/Ranking/GameTypeFilterModal";
import useTeamRankingListQuery from "@/hooks/rank/useTeamRankingListQuery";
import { teamRanking } from "@/models/teamRanking";

export default function RankPage() {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [teamRankIndex, setTeamRankIndex] = useState<number>(0);
  const [sportsType, setSportsType] = useState<string>('농구');
  const [gameType, setGameType] = useState<string>('3vs3');
  const [filterModal, setFilterModal] = useState<string>('none');

  const teamList = useTeamRankingListQuery(gameType, sportsType, filterModal);

  return (
    <div>
      <div className="w-full h-40 flex justify-between items-center pl-10 bg-white fixed top-55 z-10">
        <div className="w-180 h-40 flex">
          {tabIndex == 1 && <div className="w-90 h-40 flex items-center border-b-1 border-blue-700 text-blue-700"><div className="w-full text-center h-20 mb-3 text-15">팀 랭킹</div></div>}
          {tabIndex == 2 && <div className="w-90 h-40 flex items-center" onClick={() => setTabIndex(1)}><div className="w-full text-center text-15 items-center" >팀 랭킹</div></div>}
          {tabIndex == 1 && <div className="w-90 h-40 flex items-center" onClick={() => setTabIndex(2)}><div className="w-full text-center text-15 items-center">나의 팀 랭킹</div></div>}
          {tabIndex == 2 && <div className="w-90 h-40 flex items-center border-b-1 border-blue-700 text-blue-700"><div className="w-full text-center h-20 mb-3 text-15">나의 팀 랭킹</div></div>}
        </div>
        <div className="w-100 h-25 flex justify-center items-center bg-blue-700 rounded-5 mr-10 text-12 text-white" onClick={() => setFilterModal('sportsType')}>{sportsType} {gameType} </div>
      </div>
      {tabIndex == 1 && teamRankIndex == 0 &&
        <div className="w-full h-167 mt-49 flex">
          {teamList.isSuccess &&
            teamList.data.map((item: teamRanking, index: number) => index <= 2 && (
              <div className="w-full h-full" onClick={() => setTeamRankIndex(index)} key={index}>
                <TopRank
                  teamRanking={item}
                  rank={index + 1}
                />
              </div>
            ))}
        </div>
      } {tabIndex == 1 && teamRankIndex != 0 &&
        <MyTeamInfo />
      }{tabIndex == 2 &&
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={0}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
        >
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
          <SwiperSlide><div className="w-full h-167 ml-[-10px]"><MyTeamInfo /></div></SwiperSlide>
        </Swiper>

      }
      <div className="w-full mt-10 border-t-2 border-blue-700">
        <div className="w-full h-30 flex justify-center items-center mb-2 bg-white text-12">
          <div className="w-[calc(100%-245px)] pl-10">순위</div>
          <div className="w-47 text-center">경기</div>
          <div className="w-47 text-center">승</div>
          <div className="w-47 text-center">무</div>
          <div className="w-47 text-center">패</div>
          <div className="w-57 text-center">Rating</div>
        </div>
        {teamList.isSuccess &&
          teamList.data.map((item: teamRanking, index: number) => (
            <RankInfo
              teamRanking={item}
              rank={index + 1}
              key={index}
            />
          ))}
      </div>
      {filterModal === 'sportsType' && <SportsTypeFilterModal setSportsType={setSportsType} setFilterModal={setFilterModal}></SportsTypeFilterModal>}
      {filterModal === 'gameType' && sportsType === '농구' && <GameTypeFilterModal setGameType={setGameType} setFilterModal={setFilterModal} sportsType={'농구'}></GameTypeFilterModal>}
      {filterModal === 'gameType' && sportsType === '축구' && <GameTypeFilterModal setGameType={setGameType} setFilterModal={setFilterModal} sportsType={'축구'}></GameTypeFilterModal>}
      {filterModal === 'gameType' && sportsType === '배드민턴' && <GameTypeFilterModal setGameType={setGameType} setFilterModal={setFilterModal} sportsType={'배드민턴'}></GameTypeFilterModal>}
    </div>
  )
}