import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const coinHistoryUrl = "https://coinranking1.p.rapidapi.com/coin";
const coinHistoryHeader = {
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "d81cdbe2ddmsh2ac19b2af725c1cp19f3f5jsn8c029f79b4f6",
  },
};

export const fetchCoinHistory = createAsyncThunk(
  "coinHistory.fetchCoinHistory",
  async ({ coinId, timePeriod }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${coinHistoryUrl}/${coinId}/history/${timePeriod}`,
        coinHistoryHeader
      );
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
  coinHistory: null,
};

export const coinHisotySlice = createSlice({
  name: "coinHistory",
  initialState,
  extraReducers: {
    [fetchCoinHistory.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [fetchCoinHistory.fulfilled]: (state, { payload }) => {
      state.coinHistory = payload;
      state.status = "success";
    },
    [fetchCoinHistory.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default coinHisotySlice.reducer;
