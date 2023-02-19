import logo from '@/assets/icons/logo.png'
import paint from '@/assets/welcome/blue-paint.png'
import { RootState } from '@/stores/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function StartPage() {
  const [textLoad, setTextLoad] = useState<boolean>(false);
  const [logoLoad, setLogoLoad] = useState<boolean>(false);
  const [paintLoad, setPaintLoad] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => {
    return state.userId.id
  })
  useEffect(() => {
    setTimeout(() => {
      setTextLoad(true);
      setTimeout(() => {
        setLogoLoad(true);
        setTimeout(() => {
          setPaintLoad(true);
          setTimeout(() => {
            if (userId == 0) {
              location.assign('/login');
            } else {
              location.assign('/home');
            }
          }, 1000)
        }, 500)
      }, 1000);
    }, 500)

  }, [])

  return (
    <div className="w-full h-full relative overflow-hidden bg-blue-300">
      <div className={`${textLoad ? "opacity-100 duration-1000 ease-out" : "opacity-0"} absolute top-[calc(50%-70px)] text-30 w-full z-10 left-20 font-['cookie']`}>내 손 안의 운동장</div>
      <img className={`${logoLoad ? "visible -translate-x-1/2 duration-1000 ease-out" : "invisible translate-x-1/2"} absolute top-1/2 left-1/2 w-[300px] h-50 z-10`} src={logo}></img>
    </div >
  )
}