import { asyncUpFetch } from "@/store/slice/catSlice";
import { useDispatch, useSelector } from "react-redux"

interface CatState {
  cat: {
    status: String
    imgInfo: { id: String, url: String, height: number, width: number }
  }
}

export default function GetCat() {
  const dispatch = useDispatch();
  const status = useSelector((state: CatState) => {
    return state.cat.status
  })
  const imgInfo = useSelector((state: CatState) => {
    return state.cat.imgInfo
  })

  return (
    <div>
      <button onClick={() => {
        dispatch(asyncUpFetch())
      }}>고양이 내놔!</button>

      <h3>{status}</h3>

      <div>
        <img src={`${imgInfo.url}`} alt="" width="360px" />
      </div>

      <div>
        <h2>이미지 원본 정보</h2>
        <p>이미지 ID : {imgInfo.id}</p>
        <p>세로크기 : {imgInfo.height}</p>
        <p>가로크기 : {imgInfo.width}</p>
      </div>
    </div>
  )
}