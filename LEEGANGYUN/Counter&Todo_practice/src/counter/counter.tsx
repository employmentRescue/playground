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
      <button onClick={() => {
        dispatch(counterSlice.actions.up(2))
      }}>+</button>
      <button onClick={() => {
        dispatch(counterSlice.actions.down(2))
      }}>-</button>
      <button onClick={() => {
        dispatch(counterSlice.actions.reset())
      }}>리셋</button>
      <h1>{`${count}`}</h1>
    </div>
  )
}

export default Counter;