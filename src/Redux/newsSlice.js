import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

//the key used in accessing the endpoint
const header = {
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "d81cdbe2ddmsh2ac19b2af725c1cp19f3f5jsn8c029f79b4f6",
  },
};
// url link
const url = "https://bing-news-search1.p.rapidapi.com";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ category }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${url}/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day`,
        header
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

//initialStates
const initialState = {
  coin: null,
  status: "idle",
  error: "",
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNews.fulfilled]: (state, { payload, meta }) => {
      state.coin = payload;
      state.status = "success";
    },
    [fetchNews.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default newsSlice.reducer;
