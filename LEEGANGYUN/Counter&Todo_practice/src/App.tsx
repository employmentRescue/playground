import React from "react";
import { Provider } from "react-redux"
import store from "./store/store";
import Counter from "./counter/counter"
import Todo from "./todo/todo";

export default function App() {
  return (
    <Provider store={store}>
      <hr />
      <Counter></Counter>
      <hr />
      <Todo></Todo>
      <hr />
    </Provider>
  )
}