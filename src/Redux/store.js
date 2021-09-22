import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../Redux/Exchange";

export default configureStore({
  reducer: { exchange: exchangeReducer },
});
