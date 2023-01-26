import { useState, useRef, ReactElement } from 'react';
import JoinButton from './Buttons/JoinButton'
import exit from '@/assets/icons/exit.png'
import place from '@/assets/icons/place.png'

const arr: number[] = [... new Array(100)].map((_, i) => i + 1);

interface Props {
    children: ReactElement;
}
export default function RegisterModal({ children }: Props) {
    const [size, resize] = useState(1);
    const [height, resizeHeight] = useState(22);
    const open = () => {
        resize(5);
        resizeHeight(66);
    }
    const close = () => {
        resize(1);
        resizeHeight(22);
    }

    return (
        <div className="w-[322px] h-[265px] z-10 absolute left-1/2 ml-[-161px] bottom-14 rounded-15 bg-white flex flex-col items-center justify-center">
            <div className="w-[322px] flex h-18 mt-14">
                <div className="ml-110 text-15">실시간 운동 등록</div>
                <img className="ml-auto mr-24 mt-5 w-10 h-10" src={exit}></img>
            </div>
            <div className="w-[284px] h-20 mt-24 flex">
                <img src={place} className="w-20 h-20"></img>
                <div className='text-15 ml-6'>장소</div>
                <div className='text-15 ml-150'>고운뜰공원</div>
            </div>
            <textarea className="w-[284px] h-80 mt-12 bg-gray-600 text-gray-700 pl-15 pt-11 rounded-5" placeholder='하고 싶은 말을 작성하세요.'></textarea>
            <div className="w-[284px] h-22 mt-14 mb-13 flex">
                <div className="text-15">현재 인원</div>
                <select style={{ height: height }} size={size} onFocus={open} onBlur={close} onChange={(e) => { close(); e.target.blur() }} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
                <div className="ml-46 text-15">정원</div>
                <select style={{ height: height }} size={size} onFocus={open} onBlur={close} onChange={(e) => { close(); e.target.blur() }} className='w-36 h-22 bg-blue-600 rounded-5 text-12 pl-5 ml-14 text-white z-20'>
                    {arr.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>
                <div className="text-15 opacity-50 ml-6">명</div>
            </div>
            {children}
        </div>

    )

}