import React from "react";

function ServicesCard({ title, count, details }) {
  return (
    <div className="min-h-[170px] min-w-[400px] bg-gradient-to-br from-[#0c1f47] to-[#161132] text-white p-4 rounded-2xl shadow-2xl shadow-black/60">
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{title}</p>
        <span className="text-green-400 text-xs flex items-center">
          {count > 0 ? `+${((count / (count + 1)) * 100).toFixed(1)}%` : "0%"}
        </span>
      </div>
      <h2 className="text-3xl font-semibold my-2">{count}</h2>
      <p className="text-sm text-gray-400">{details}</p>
      <p className="text-xs text-gray-500">Bookings for the last period</p>
    </div>
  );
}

export default ServicesCard;