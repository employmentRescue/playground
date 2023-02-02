import React, { useState, useRef, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoinButton from './Buttons/JoinButton'
import exit from '@/assets/icons/exit.png'
import placeIcon from '@/assets/icons/place.png'
import { addLiveMatch } from '@/stores/live/live';
import { liveMatch } from '@/models/liveMatch';
import ModifyButton from './Buttons/ModifyButton';

const arr: number[] = [... new Array(15)].map((_, i) => i + 1);

interface Iprops {
    liveMatch: liveMatch;
    openModal: string;
    closeModal: () => void;
}

export default function ModifyModal(props: Iprops) {
    const dispatch = useDispatch();
    const [size, resize] = useState(1); // 현재 인원 size
    const [size2, resize2] = useState(1); // 정원 size
    const [height, resizeHeight] = useState(22); // 현재 인원 height
    const [height2, resizeHeight2] = useState(22); // 정원 height
    const [place, setPlace] = useState(props.liveMatch.place);
    const [detail, setDetail] = useState(props.liveMatch.detail);
    const [currentPeopleNum, setCurrentPeopleNum] = useState(props.liveMatch.currentPeopleNum);
    const [totalPeopleNum, setTotalPeopleNum] = useState(props.liveMatch.totalPeopleNum);

    const open = (b: boolean) => {
        if (b) {
            resize(5);
            resizeHeight(66);
        }
        else {
            resize2(5);
            resizeHeight2(66);
        }

    }
    const close = (b: boolean) => {
        if (b) {
            resize(1);
            resizeHeight(22);
        }
        else {
            resize2(1);
            resizeHeight2(22);
        }
    }

    const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetail(e.target.value);
    }

    const handleCurrentPeopleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPeopleNum(Number(e.target.value));
    }

    const handleTotalPeopleNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotalPeopleNum(Number(e.target.value));
    }

    const modify = () => {
        // dispatch(addLiveMatch({
        //     type: props.liveMatch.type,
        //     place: place,
        //     detail: detail,
        //     lat: props.liveMatch.lat,
        //     lng: props.liveMatch.lng,
        //     currentPeopleNum: currentPeopleNum,
        //     totalPeopleNum: totalPeopleNum,
        // }));
        props.closeModal();

    }

    return (props.openModal === "register" ?
        <div className="w-[322px] h-[265px] z-10 absolute left-1/2 ml-[-161px] bottom-14 rounded-15 bg-white flex flex-col items-center justify-center">
            <div className="w-[322px] flex h-18 mt-14">
                <div className="ml-110 text-15">실시간 운동 등록</div>
                <img className="w-10 h-10 ml-auto mr-24 mt-5" src={exit} onClick={props.closeModal}></img>
            </div>
            <div className="w-[284px] h-20 mt-24 flex">
                <img src={placeIcon} className="w-20 h-20"></img>
                <div className='text-15 ml-6'>장소</div>
                <div className='text-15 ml-150'>고운뜰공원</div>
            </div>
            <textarea onChange={handleDetailChange} value={detail} className="w-[284px] h-80 mt-12 bg-gray-600 text-gray-700 pl-15 pt-11 rounded-5" placeholder='하고 싶은 말을 작성하세요.'></textarea>
            <div className="w-[284px] h-22 mt-14 mb-13 flex">
                <div className="text-15">현재 인원</div>
                <select style={{ height: height }} size={size} onFocus={() => open(true)} onBlur={() => close(true)} onChange={(e) => { close(true); e.target.blur(); handleCurrentPeopleNumChange }} value={currentPeopleNum} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
                <div className="ml-46 text-15">정원</div>
                <select style={{ height: height2 }} size={size2} onFocus={() => open(false)} onBlur={() => close(false)} onChange={(e) => { close(false); e.target.blur(); handleTotalPeopleNumChange }} value={totalPeopleNum} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
            </div>
            <ModifyButton onClickModify={modify} onClickDelete={modify}></ModifyButton>
        </div>
        : null
    )

}
