import { useEffect, useState } from "react";
import {
  BarChart,
  MainMap,
  MainTable,
  PieChart,
  SmallCard,
} from "../components";

import {
  fetchRestaurants,
  RestaurantState,
} from "../redux/slices/restaurant-slice";

import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../layouts/dashboard-layout";
import { fetchChart, ChartState } from "../redux/slices/chart-slice";

const Dashboard = () => {
  const { restaurants }: RestaurantState = useSelector(
    (state: RootState) => state.restaurants
  );

  const nameRestaurants = restaurants.list_restaurant.map(
    (restaurant: any) => restaurant.name_breadcrumb
  );

  const { chart }: ChartState = useSelector((state: RootState) => state.chart);

  const headerTable = [
    "Name",
    "Location",
    "City",
    "Province",
    "Rating",
    "Cuisine",
    "Payment",
  ];

  const [dataTable, setDataTable] = useState<any>([]);

  const [pagingtable, setPagingtable] = useState<any>({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (restaurants.list_restaurant.length !== 0) {
      let tempRestaurants: any = [];
      restaurants.list_restaurant.forEach((restaurant) => {
        let tempDataTable = {
          name: restaurant.name_breadcrumb,
          location: restaurant.location,
          city: restaurant.city,
          province: restaurant.province,
          rating: restaurant.rating.overall,
          cuisine: restaurant.cuisinetype,
          payment: restaurant.payment_method.toString(),
        };
        tempRestaurants = tempRestaurants.concat(tempDataTable);
      });

      setPagingtable((prevState: any) => {
        return {
          ...prevState,
          page: restaurants.page,
          length: restaurants.length,
          length_all_data: restaurants.length_all_data,
        };
      });
      setDataTable([...tempRestaurants]);
    }
  }, [restaurants]);

  useEffect(() => {
    dispatch(fetchChart({ group_by: "rating" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRestaurants({ page: 1 }));
  }, [dispatch]);

  const fetchDataHandler = (page: number) => {
    dispatch(fetchRestaurants({ page: page }));
  };

  return (
    <DashboardLayout titlePage={"Admin | Dashboard"}>
      <p>Dashboard Page</p>
      <div className={`flex flex-col`}>
        <div className="md:grid md:grid-cols-4 md:gap-3 my-2">
          <figure className="col-span-3 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
            <p className={`text-lg font-bold p-4`}>GIS MAP</p>
            <MainMap />
          </figure>
          <figure className="col-span-1 shadow-2xl bg-white rounded-md my-2 bg-cover h-auto w-auto p-4">
            <p className={`text-lg font-bold p-4`}>List of Restaurant</p>
            <div className={`flex h-72 flex-col overflow-auto`}>
              {nameRestaurants &&
                nameRestaurants.map((name, index) => {
                  return <SmallCard key={`small-card-${index}`} title={name} />;
                })}
            </div>
          </figure>
          <figure className="col-span-4 shadow-2xl bg-white rounded-md my-2 bg-cover overflow-auto">
            <p className={`text-lg font-bold p-4`}>
              Table of Restaurant located in Jakarta
            </p>
            <MainTable
              headerTable={headerTable}
              dataTable={dataTable}
              dataPaging={pagingtable}
              hrefPaging={fetchDataHandler}
            />
          </figure>
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

export default Dashboard;
