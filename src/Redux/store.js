import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../Redux/Exchange";
import coinDetailsReducer from "./coinDetailsSlice";
import newsReducer from "./newsSlice";
import coinHistoryReducer from "./coinHistory";
import coinExchangeReducer from "./coinExchange";

export default configureStore({
  reducer: {
    exchange: exchangeReducer,
    news: newsReducer,
    coinDetails: coinDetailsReducer,
    coinHistory: coinHistoryReducer,
    coinExchange: coinExchangeReducer,
  },
});
