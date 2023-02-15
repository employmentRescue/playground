import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const CHATTING = '/chatting';

const fetcher = (roomId: number) => axios.get(CHATTING_SERVER_URL + `/chat/TeamChatRoom/enter/${roomId}`).then(({ data }) => data).catch((error) => console.log(error))

// 좌표를 받아왔을 때만 query
const useGetExactChattingRoom = (roomId: number) => {
    return useQuery(CHATTING, () => fetcher(roomId), {
        staleTime: 0, cacheTime: 60 * 5 * 1000,
        refetchOnWindowFocus: false, refetchOnReconnect: false
    });
}

export default useGetExactChattingRoom;