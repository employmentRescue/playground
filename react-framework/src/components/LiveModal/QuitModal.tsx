import placeIcon from '@/assets/icons/place.png'
import exitIcon from '@/assets/icons/exit.png'
import timeIcon from '@/assets/icons/time.png'
import peopleIcon from '@/assets/icons/people.png'
import profileIcon from '@/assets/profiles/taek.png'
import { useDispatch } from 'react-redux';
import QuitButton from './Buttons/QuitButton';

interface Iprops {
    type: string;
    lat: number;
    lng: number;
    openModal: string;
    closeModal: () => void;
}

export default function QuitModal(props: Iprops) {
    const dispatch = useDispatch();

    const quit = () => {
        props.closeModal();

    }
    return (props.openModal === "register" ?
        <div className="w-[322px] h-[341px] z-10 absolute left-1/2 ml-[-161px] bottom-14 rounded-15 bg-white flex flex-col items-center justify-center">
            <div className="w-[322px] flex h-18 mt-14">
                <div className="ml-110 text-15">실시간 참여</div>
                <img className="w-10 h-10 ml-auto mr-24 mt-5" src={exitIcon} onClick={props.closeModal}></img>
            </div>
            <div className="w-[284px] h-20 mt-20 flex justify-between">
                <div className='flex'>
                    <img src={peopleIcon} className="w-20 h-20"></img>
                    <div className='text-15 ml-6'>현재인원/정원</div>
                </div>

                <div className='text-15'>고운뜰공원</div>
            </div>
            <div className="w-[284px] h-20 mt-16 flex justify-between">
                <div className='flex'>
                    <img src={timeIcon} className="w-20 h-20"></img>
                    <div className='text-15 ml-6'>남은시간</div>
                </div>
                <div className='text-15'>고운뜰공원</div>
            </div>
            <div className="w-[284px] h-20 mt-16 flex justify-between">
                <div className='flex'>
                    <img src={placeIcon} className="w-20 h-20"></img>
                    <div className='text-15 ml-6'>장소</div>
                </div>
                <div className='text-15'>고운뜰공원</div>
            </div>
            <div className='w-[284px] h-2 mt-10 bg-gray-600'></div>
            <div className='w-[284px] h-100 mt-16 mb-16 flex justify-between'>
                <div className='w-63 h-100 ml-20 flex flex-col justify-center'>
                    <img className='w-63 h-63' src={profileIcon}></img>
                    <div className='text-11'>슈슈슈터님</div>
                </div>
                <div className='w-160 h-100 rounded-10 bg-gray-500'></div>
            </div>


            <QuitButton onClick={quit}>참여취소</QuitButton>
        </div>
        : null
    )
}