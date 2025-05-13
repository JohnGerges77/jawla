"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from "chart.js";
import Spinner from "@/app/_components/Spinner";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

function AreaChart({ salesData }) {

  const allSalesLabels = salesData.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  });

 


  const salesValues = salesData.map((item) => item.earnings);

  const salesChartData = {
    labels: allSalesLabels, 
    datasets: [
      {
        label: "Sales",
        data: salesValues,
        fill: true,
        backgroundColor: "rgba(29, 78, 216, 0.5)",
        borderColor: "rgba(30, 80, 216, 1)",
        tension: 0.4,
      },
    ],
  };

  const salesChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          callback: function (index) {
          
            return index % 2 === 0 ? allSalesLabels[index] : "";
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          stepSize: 1000,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="text-white w-full">
      <div className="bg-gradient-to-br from-[#0c1f47] to-[#161132] text-white px-5 pt-1 rounded-2xl shadow-2xl shadow-black/60">
        <h3 className="text-2xl font-semibold text-secondary mt-2 ml-2">
          Sales from {allSalesLabels[0] || "Start"} - {allSalesLabels[allSalesLabels.length - 1] || "End"}
        </h3>
        <div className="w-[100%] h-[350px]">
          {salesData.length > 0 ? (
            <Line data={salesChartData} options={salesChartOptions} />
          ) : (
           <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default AreaChart;