import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const coinExchangeUrl = "https://coinranking1.p.rapidapi.com/exchanges";

const coinExchangeHeader = {
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "d81cdbe2ddmsh2ac19b2af725c1cp19f3f5jsn8c029f79b4f6",
  },
};

export const fetchExchange = createAsyncThunk(
  "coinExchange.fetchExchange",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(coinExchangeUrl, coinExchangeHeader);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//initialStates
const initialState = {
  status: "idle",
  error: null,
  coinExchange: null,
};

export const coinExchange = createSlice({
  name: "coinExchange",
  initialState,
  extraReducers: {
    [fetchExchange.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [fetchExchange.fulfilled]: (state, { payload }) => {
      state.coinExchange = payload;
      state.status = "success";
    },
    [fetchExchange.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default coinExchange.reducer;
