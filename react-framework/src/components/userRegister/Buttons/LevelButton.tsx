import { useDispatch } from "react-redux"
import { setSportsLevel } from "@/stores/register/userInfo"

interface LevelButtonProps {
  sportName: "football" | "basketball" | "badminton" | null;
  level: any;
  className: any;
}

export default function LevelButton({ sportName, level, className }: LevelButtonProps) {
  const dispatch = useDispatch()

  return (
    <div>
      <button
        className={
          "w-40 h-20 text-10 rounded-5 mr-10 mt-9 font-inte align-middle tracking-tight "
          + className
        }
        onClick={() => dispatch(setSportsLevel({ sportName: sportName, level: level }))}
      >
        {level}
      </button>
    </div>
  )
}