import { configureStore } from "@reduxjs/toolkit";

import restaurantSlice from "./slices/restaurant-slice";
import chartSlice from "./slices/chart-slice";

const store = configureStore({
  reducer: {
    restaurants: restaurantSlice,
    chart: chartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
