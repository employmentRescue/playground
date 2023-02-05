import useLiveMatchQuit from "@/hooks/liveMatch/useLiveMatchQuit";
import useLiveMatchRegister from "@/hooks/liveMatch/useLiveMatchRegister";
import { place } from "@/models/place";
import moment from 'moment';

interface Iprops {
    currentPeopleNum: number,
    totalPeopleNum: number,
    place: place,
    sports: string,
    detail: string,
    closeRegisterModal: () => void;
    closeModal: () => void;
}



export default function RegisterConfirmModal(props: Iprops) {

    const { mutate } = useLiveMatchRegister();
    const now = moment().format('YYYY-MM-DD HH:mm:ss'); // 시:분:초

    return (
        <div className="absolute bottom-[-14px] w-screen h-screen bg-black/50">
            <div className="w-[328px] h-131 absolute rounded-15 top-1/2 left-1/2 ml-[-164px] bg-white">
                <div className="mt-20 ml-21 text-15 font-bold ">모임 등록</div>
                <div className="mt-10 ml-21 text-15 text-gray-400">모임을 등록합니다.</div>
                <div className="flex mt-18 justify-end">
                    <div className="text-16 mr-32 text-gray-500" onClick={props.closeRegisterModal}>취소</div>
                    <div className="text-16 mr-24 text-blue-700" onClick={() => {
                        mutate({
                            currentPeopleNum: props.currentPeopleNum,
                            totalPeopleNum: props.totalPeopleNum,
                            detail: props.detail,
                            hostId: 111,
                            place: {
                                address: props.place.address,
                                lat: props.place.lat,
                                lng: props.place.lng,
                            },
                            registTime: now,
                            sports: props.sports,
                        }); props.closeModal();
                    }}>등록</div>
                </div>
            </div>
        </div>
    )
}