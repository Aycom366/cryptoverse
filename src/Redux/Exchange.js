import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const header = {
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "d81cdbe2ddmsh2ac19b2af725c1cp19f3f5jsn8c029f79b4f6",
  },
};
const url = "https://coinranking1.p.rapidapi.com/coins";

export const fetchExhange = createAsyncThunk(
  "exchange/fetchExhange",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url, header);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  exchange: null,
  status: "idle",
  error: null,
};

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  extraReducers: {
    [fetchExhange.pending]: (state) => {
      state.status = "loading";
    },
    [fetchExhange.fulfilled]: (state, { payload, meta }) => {
      console.log(meta);
      state.exchange = payload;
      state.status = "success";
    },
    [fetchExhange.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default exchangeSlice.reducer;
