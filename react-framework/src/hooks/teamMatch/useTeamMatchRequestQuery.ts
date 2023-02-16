import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

interface matchRequestData {
    distance: number,
    gameType: string,
    lat: number,
    lng: number,
    matchDate: string,
    maxStartTime: string,
    memberId: number,
    minStartTime: string,
    registerTime: string,
    sports: string,
    teamId: number
}

const fetcher = (matchRequest: matchRequestData) => axios.post(SERVER_URL + '/match/matching',
  {
    params :{
        distance: matchRequest.distance,
        gameType: matchRequest.gameType,
        lat: matchRequest.lat,
        lng: matchRequest.lng,
        matchDate: matchRequest.matchDate,
        maxStartTime: matchRequest.maxStartTime,
        memberId: matchRequest.memberId,
        minStartTime: matchRequest.minStartTime,
        registerTime: matchRequest.registerTime,
        sports: matchRequest.sports,
        teamId: matchRequest.teamId
    }
  },
);

const useTeamMatchRequestQuery = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.replace('/team-match')
    },
  });
};

export default useTeamMatchRequestQuery;    