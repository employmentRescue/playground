import { createSlice } from "@reduxjs/toolkit"

const initialState: Array<{ id: number, text: string, done: boolean }> = [];

let nextId = 0;

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    create: (state, action) => {
      state.push({
        id: nextId++,
        text: action.payload,
        done: false
      })
    },
    delete: (state, action) => {
      console.log(action.payload)
      return state.filter(e => e.id !== action.payload)
    },
    check: (state, action) => {
      return state.map(e => e.id === action.payload ? { ...e, done: !e.done } : e)
    }
  }
})

export default todoSlice;