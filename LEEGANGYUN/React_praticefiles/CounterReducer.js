import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + action.payload };
    case "decrement":
      return { count: state.count - action.payload };
    default:
      throw new Error("unsupported action type: ", action.type)
  }
}

const CounterReducer = () => {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h2>{state.count}</h2>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>증가</button>
      <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>감소</button>
      <button onClick={() => dispatch({ type: "asdasdasd", payload: 1 })}>에러</button>
    </>
  )
}

export default CounterReducer