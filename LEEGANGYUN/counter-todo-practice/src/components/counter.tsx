import { useDispatch, useSelector } from "react-redux"
import counterSlice from "@/store/slices/counterSlice"

interface counterState {
  counter: { value: number }
}

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state: counterState) => {
    // console.log(state)
    return state.counter.value
  })
  return (
    <div>
      <h1>Counter</h1>
      <button className="w-50 bg-red-500" onClick={() => {
        dispatch(counterSlice.actions.up(2))
      }}>+</button>
      <button className="w-50 bg-blue-400" onClick={() => {
        dispatch(counterSlice.actions.down(2))
      }}>-</button>
      <button className="w-100 bg-green-400" onClick={() => {
        dispatch(counterSlice.actions.reset())
      }}>리셋</button>
      <div className="w-100 h-100 justify-center">
        <p>
          {count}
        </p>
      </div>
    </div>
  )
}

export default Counter;