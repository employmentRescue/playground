import { match } from '@/models/match';
import { CHATTING_SERVER_URL, SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';
import useGatheringChatRegister from '../chat/useGatheringChatRegister';

const fetcher = (match: match) => axios.post(SERVER_URL + '/gathering/register',
  {
    sports: match.sports,
    title: match.title,
    description: match.description,
    place: match.place,
    startDate: match.startDate,
    startTime: match.startTime,
    gameType: match.gameType,
    level: match.level,
    playTime: match.playTime,
    sex: match.sex,
    hostId: match.hostId,
    people: match.people,
  }
).then(() => {
  axios.post(CHATTING_SERVER_URL + '/chat/GatheringChatRoom',);
  console.log("?")
});


const useMatchRegister = () => {
  return useMutation(fetcher, {
    onSuccess: () => {
      location.assign('/match')
    },
  });
};

export default useMatchRegister;    