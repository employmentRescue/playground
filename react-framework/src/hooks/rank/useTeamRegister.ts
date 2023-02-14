import { teamInfo } from '@/models/teamInfo';
import { SERVER_URL } from '@/utils/url';
import axios from 'axios';
import { useMutation } from 'react-query';

const fetcher = (teamInfo: teamInfo) => axios.post(SERVER_URL + '/team/register',
    {
        gameType: teamInfo.gameType,
        level: teamInfo.level,
        name: teamInfo.name,
        sports: teamInfo.sports,
        teamMemberList: teamInfo.teamMemberList.map((memberId) => {
            return { memberId: memberId }
        })
    }
);

const useTeamRegister = () => {
    return useMutation(fetcher);
};

export default useTeamRegister;    