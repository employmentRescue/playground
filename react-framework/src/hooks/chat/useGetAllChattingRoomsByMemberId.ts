import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const CHATTING = '/chatting';

const fetcher = (memberId: number) => axios.get(SERVER_URL + `/chat/TeamChatRoom/${memberId}`).then(({ data }) => data).catch((error) => console.log(error))

// 좌표를 받아왔을 때만 query
const useGetAllChattingRoomsByMemberId = (memberId: number) => {
    return useQuery(CHATTING, () => fetcher(memberId), { cacheTime: 5 * 5 * 1000, refetchInterval: 30 * 1000, refetchOnWindowFocus: false });
}

export default useGetAllChattingRoomsByMemberId;