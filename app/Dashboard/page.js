"use client";
import React, { useState, useEffect } from "react";
import HomeCard from "./_DashboardComponents/HomeCard";
import {
  GetAvaliableTrips,
  GetSales,
  GetTripsBookings,
  GetUsersNumber,
  GetLocations,
  GetTotalEarningsGrouped,
} from "./DashboardApis/StatisticsApi";
import PieChart from "./_DashboardComponents/PieChart";
import AreaChart from "./_DashboardComponents/AreaChart";

function Page() {
  const [usersNumber, setUsersNumber] = useState(null);
  const [availableTrips, setAvailableTrips] = useState(null);
  const [tripsBookings, setTripsBookings] = useState(null);
  const [sales, setSales] = useState(null);
  const [locationsData, setLocationsData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [day, setDay] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await GetUsersNumber(day);
      setUsersNumber(usersData?.count);

      const tripsData = await GetAvaliableTrips(day);
      setAvailableTrips(tripsData?.count);

      const bookingsData = await GetTripsBookings(day);
      setTripsBookings(bookingsData?.count);

      const SalesData = await GetSales(day);
      setSales(SalesData?.earnings);

      const locations = await GetLocations(day);
      setLocationsData(locations || []);

      try {
                const salesGroupedData = await GetTotalEarningsGrouped(day);
                setSalesData(salesGroupedData || []);
                console.log('locations:' +salesGroupedData);
              } catch (error) {
                console.error("Error fetching total earnings grouped:", error.message);
                setSalesData([]);
              }
            

            }

    fetchData();
  }, [day]);

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="bg-[#192335] p-1 space-x-1 rounded-lg flex">
          {[
            { label: "1 Day", value: 1 },
            { label: "7 Days", value: 7 },
            { label: "30 Days", value: 30 },
            { label: "90 Days", value: 90 },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setDay(option.value)}
              className={`px-3 py-1 rounded transition duration-500 ${
                day === option.value
                  ? "bg-blue-700 text-white"
                  : "text-gray-300 hover:bg-blue-700 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-2 gap-4  px-4 pl-20 xl:pl-0">
        <HomeCard data={usersNumber} title="Total Users" time={day} />
        <HomeCard data={sales} title="Sales" time={day} />
        <HomeCard data={availableTrips} title="Active Trips" time={day} />
        <HomeCard data={tripsBookings} title="Trips Bookings" time={day} />
      </div>
      <div className="flex xl:flex-row flex-col pl-20 xl:pl-0 justify-center  xl:justify-between mt-8 ">
        <div className="xl:w-[66%] w-[80%]">
          <AreaChart salesData={salesData} />
        </div>
        <div className="xl:w-[31%] w-[50%] pl-mt-0">
          <PieChart locationsData={locationsData} />
        </div>
      </div>
    </>
  );
}

export default Page;






