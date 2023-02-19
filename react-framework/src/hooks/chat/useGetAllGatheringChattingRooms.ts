import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const CHATTING = '/chatting_gahter';

const fetcher = (memberId: number) => axios.get(CHATTING_SERVER_URL + `/chat/GatheringChatRoom/${memberId}`).then(({ data }) => data).catch((error) => console.log(error))

const useGetAllGatheringChattingRooms = (memberId: number) => {
  return useQuery(CHATTING, () => fetcher(memberId), {
    staleTime: 0, cacheTime: 60 * 5 * 1000,
    refetchOnWindowFocus: false, refetchOnReconnect: false
  });
}

export default useGetAllGatheringChattingRooms;