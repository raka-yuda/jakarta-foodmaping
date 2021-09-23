import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Restaurant } from "../../types";
import { client } from "../../helpers/api/client";

const path = "/restaurants/";
const url = "http://localhost:3000/api" + path;

interface RestaurantResponseType {
  page: number;
  length: number;
  length_all_data: number;
  list_restaurant: Restaurant[];
}

interface RestaurantRequestType {
  page: number;
}

export interface RestaurantState {
  restaurants: RestaurantResponseType;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: any;
}

const initialState = {
  restaurants: {
    page: 0,
    length: 0,
    length_all_data: 0,
    list_restaurant: [],
  },
  status: "idle",
  error: null,
} as RestaurantState;

export const fetchRestaurants = createAsyncThunk<
  RestaurantResponseType,
  RestaurantRequestType
>("restaurant/fetchRestaurants", async (restaurant) => {
  const { page } = restaurant;
  const apiUrl = url + page;
  const response: any = await client.get(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });
  return response as RestaurantResponseType;
});

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = { ...state.restaurants, ...action.payload };
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default restaurantsSlice.reducer;
