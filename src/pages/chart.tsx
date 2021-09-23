import { useEffect, useRef, useState } from "react";
import { BarChart, MainMap, MainTable, PieChart } from "../components";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

import {
  fetchRestaurants,
  RestaurantState,
} from "../redux/slices/restaurant-slice";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/dashboard-layout";
import { fetchChart, ChartState } from "../redux/slices/chart-slice";

const Chart = () => {
  const { chart }: ChartState = useSelector((state: RootState) => state.chart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChart({ group_by: "rating" }));
  }, [dispatch]);

  return (
    <DashboardLayout titlePage={"Admin | Dashboard"}>
      <p>Chart Page</p>
      <div className={`flex flex-col`}>
        <div className="md:grid md:grid-cols-4 md:gap-3 my-2">
          <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
            <p className={`text-lg font-bold p-4`}>
              Chart of Restaurant Overall Rating
            </p>
            {chart && (
              <PieChart
                data={chart.data}
                title={`Restaurants`}
                unit={`Restaurants`}
              />
            )}
          </figure>
          <figure className="col-span-2 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
            <p className={`text-lg font-bold p-4`}>
              Chart of Restaurant Overall Rating
            </p>
            {chart && (
              <BarChart
                data={chart.data}
                title={`Restaurants`}
                unit={`Restaurants`}
              />
            )}
          </figure>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chart;
