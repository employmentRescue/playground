import { useEffect, useState } from "react"
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
import { setTabName } from "@/stores/tab/tabName";
import { useDispatch, useSelector } from "react-redux";
import useMyTeamRankingListQuery from "@/hooks/rank/useTeamRankingMyListQuery";
import { RootState } from "@/stores/store";
import useTeamListQuery from "@/hooks/team/useTeamListQuery";
import { team } from "@/models/team";
import useMyTeamRankingMyListQuery from "@/hooks/rank/useTeamRankingMyListQuery";
import useTeamRankingMyListQuery from "@/hooks/rank/useTeamRankingMyListQuery";
import { activeIndex } from "@/stores/register/registerTab";

export default function RankPage() {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [teamRankIndex, setTeamRankIndex] = useState<number>(0);
  const [teamInfo, setTeamInfo] = useState<any | null>(null);
  const [sportsType, setSportsType] = useState<string>('농구');
  const [gameType, setGameType] = useState<string>('3vs3');
  const [sortType, setSortType] = useState<string>('Rating');
  const [filterModal, setFilterModal] = useState<string>('none');
  const [myTeamIndex, setMyTeamIndex] = useState<number>(0);
  const [myTeamId, setMyteamId] = useState<number>(0);

  const teamList = useTeamRankingListQuery(gameType, sportsType, sortType, filterModal);
  const userId = useSelector((state: RootState) => {
    return state.userId.id;
  });
  const myTeamList = useTeamListQuery(userId);
  const myTeamInfo = useTeamRankingMyListQuery(myTeamId, sortType, tabIndex, myTeamList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTabName('팀 랭킹'))
  }, [])

  useEffect(() => {
    if (myTeamList.data) {
      setMyteamId(myTeamList.data[myTeamIndex]?.team?.teamId)
    }
  }, [myTeamList.isSuccess, myTeamIndex])

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
        <div className="w-[calc(100%-5px)] h-167 mt-49 flex mr-5 ml-5">
          {teamList.isSuccess &&
            teamList.data.map((item: teamRanking, index: number) => index <= 2 && (
              <div className="w-full h-full mr-5" onClick={() => { setTeamRankIndex(index + 1); setTeamInfo(item); }} key={index}>
                <TopRank
                  teamRanking={item}
                  rank={index + 1}
                />
              </div>
            ))}
        </div>
      } {tabIndex == 1 && teamRankIndex != 0 && teamInfo &&
        <MyTeamInfo rank={teamRankIndex} teamRanking={teamInfo} isMyTeam={false} />
      }{tabIndex == 2 &&
        <Swiper
          slidesPerView={1.1}
          centeredSlides={true}
          spaceBetween={0}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          onActiveIndexChange={(e) => { setMyTeamIndex(e.activeIndex); console.log(e.activeIndex) }}
        >
          {myTeamList.data && myTeamInfo.data &&
            myTeamList.data.map((item: team, index: number) => (
              <SwiperSlide key={index}>
                <div className="w-full h-167 ml-[-10px]">
                  <MyTeamInfo rank={myTeamInfo.data.myTeamRank} teamRanking={item} isMyTeam={true} />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

      }
      <div className="w-full mt-10 border-t-2 border-blue-700">
        <div className="w-full h-30 flex justify-center items-center mb-2 bg-white text-12">
          <div className="w-[calc(100%-245px)] pl-10">순위</div>
          {sortType === '경기' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">경기</div> : <div className="w-47 h-full flex items-center justify-center text-12" onClick={() => setSortType('경기')}>경기</div>}
          {sortType === '승' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600 ">승</div> : <div className="w-47 h-full flex items-center justify-center text-12" onClick={() => setSortType('승')}>승</div>}
          {sortType === '무' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">무</div> : <div className="w-47 h-full flex items-center justify-center text-12" onClick={() => setSortType('무')}>무</div>}
          {sortType === '패' ? <div className="w-47 h-full flex items-center justify-center text-12 bg-gray-600">패</div> : <div className="w-47 h-full flex items-center justify-center text-12" onClick={() => setSortType('패')}>패</div>}
          {sortType === 'Rating' ? <div className="w-57 h-full flex items-center justify-center text-12 bg-gray-600">Rating</div> : <div className="w-57 h-full flex items-center justify-center text-12" onClick={() => setSortType('Rating')}>Rating</div>}
        </div>
        {tabIndex == 1 && teamList.data &&
          teamList.data.map((item: teamRanking, index: number) => (
            <div onClick={() => { setTeamRankIndex(index + 1); setTeamInfo(item); }} key={index}>
              <RankInfo
                teamRanking={item}
                rank={index + 1}
                isClicked={index + 1 === teamRankIndex}
                sortType={sortType}
              />
            </div>
          ))}
        {tabIndex == 2 && myTeamInfo.isSuccess && myTeamInfo.data.rankingMap &&
          Object.keys(myTeamInfo.data.rankingMap).map((item: any, index: number) => (
            <RankInfo
              teamRanking={myTeamInfo.data.rankingMap[item]}
              rank={item}
              isClicked={item == myTeamInfo.data.myTeamRank}
              sortType={sortType}
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