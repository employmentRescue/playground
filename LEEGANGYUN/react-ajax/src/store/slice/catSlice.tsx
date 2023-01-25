import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const asyncUpFetch: any = createAsyncThunk(
  'catSlice/asyncUpFetch',
  async () => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data: Array<{ id: String, url: String, width: number, height: number }> = await response.json();
    console.log(data[0]);
    return data[0];
  }
)

export const catSlice = createSlice({
  name: 'catSlice',
  initialState: {
    status: 'Welcome',
    imgInfo: { id: '이미지를 가져오세요', url: '', height: 0, width: 0 }
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state) => {
      state.status = 'Loading';
    })
    builder.addCase(asyncUpFetch.fulfilled, (state, action) => {
      state.imgInfo = action.payload;
      state.status = 'complete';
    })
    builder.addCase(asyncUpFetch.rejected, (state) => {
      state.status = 'fail';
    })
  }
})