import { CHATTING_SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useQuery } from 'react-query';

export const MESSAGE_LIST = '/messageList';

const fetcher = (roomId: number) => axios.get(CHATTING_SERVER_URL + `/chat/messageList/${roomId}`).then(({ data }) => data).catch((error) => console.log(error))

// 좌표를 받아왔을 때만 query
const useGetMessagesOfRoom = (roomId: number) => {
    return useQuery(MESSAGE_LIST, () => fetcher(roomId), {
    });
}

export default useGetMessagesOfRoom