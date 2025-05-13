"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Spinner from "@/app/_components/Spinner";


ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ locationsData }) {
  const sortedLocations = [...locationsData].sort((a, b) => b.count - a.count);
  const topSevenLocations = sortedLocations.slice(0, 7);

  const labels = topSevenLocations.map((item) => item.location);
  const counts = topSevenLocations.map((item) => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Travelers",
        data: counts,
        backgroundColor: [
          "#b91c1c",
          "#1d4ed8",
          "#7e22ce",
          "#14b8a6",
          "#a16207",
          "#4d7c0f",
          "#0f766e",
        ],
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 14,
          },
          color: "#ffffff",
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="text-white w-full">
      <div className="bg-gradient-to-br from-[#0c1f47] to-[#161132] text-white px-5 pt-1 rounded-2xl shadow-2xl shadow-black/60">
        <h3 className="text-2xl font-semibold text-secondary mt-2 ml-2">Top Locations</h3>
        <div className="w-[350px] h-[350px]">
          {locationsData.length > 0 ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default PieChart;