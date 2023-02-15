import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const CHATTING = '/chatting';

const fetcher = (memberId: number) => axios.get(CHATTING_SERVER_URL + `/chat/TeamChatRoom/${memberId}`).then(({ data }) => data).catch((error) => console.log(error))

// 좌표를 받아왔을 때만 query
const useGetAllTeamChattingRoomsByMemberId = (memberId: number) => {
    return useQuery(CHATTING, () => fetcher(memberId), {
        staleTime: 0, cacheTime: 60 * 5 * 1000,
        refetchOnWindowFocus: false, refetchOnReconnect: false
    });
}

export default useGetAllTeamChattingRoomsByMemberId;