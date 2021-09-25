import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const coinDetailsUrl = "https://coinranking1.p.rapidapi.com/coin";
const coinDetailsHeader = {
  headers: {
    "x-rapidapi-host": "coinranking1.p.rapidapi.com",
    "x-rapidapi-key": "d81cdbe2ddmsh2ac19b2af725c1cp19f3f5jsn8c029f79b4f6",
  },
};

export const fetchCoinDetails = createAsyncThunk(
  "coinDetails.fetchCoinDetails",
  async (coinId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${coinDetailsUrl}/${coinId}`,
        coinDetailsHeader
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
  coinDetails: null,
};

export const coinDetailsSlice = createSlice({
  name: "coinDetails",
  initialState,
  extraReducers: {
    [fetchCoinDetails.pending]: (state) => {
      state.status = "loading";
      state.error = "";
    },
    [fetchCoinDetails.fulfilled]: (state, { payload }) => {
      state.coinDetails = payload;
      state.status = "success";
    },
    [fetchCoinDetails.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default coinDetailsSlice.reducer;
