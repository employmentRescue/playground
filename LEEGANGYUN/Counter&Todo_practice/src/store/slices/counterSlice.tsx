import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    up: (state, action) => {
      state.value += action.payload;
    },
    down: (state, action) => {
      if (state.value <= 0) {
        return alert('0 이하는 카운트가 불가능합니다..')
      } else {
        state.value -= action.payload;
      }
    },
    reset: (state) => {
      state.value = 0
    },
  }
})

export default counterSlice;