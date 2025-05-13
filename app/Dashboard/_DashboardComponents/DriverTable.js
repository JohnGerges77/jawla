import React, { useState } from "react";

const DriverTable = ({ drivers, handleEdit, handleDelete }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All"); 

  const filteredDrivers = drivers.filter((driver) => {
    if (filter === "Available") return driver.state === "Available";
    if (filter === "Unavailable") return driver.state === "Unavailable";
    return true; 
  });

  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedDrivers = filteredDrivers.slice(startIndex, startIndex + itemsPerPage);

  return (
<>

    <div className="flex justify-end  mb-2 ">
    <div className="bg-[#192233] p-1 space-x-2 rounded-lg">

    {["All", "Available", "Unavailable"].map((option) => (
      <button
      key={option}
      onClick={() => setFilter(option)}
      className={`px-3 py-1 rounded transition duration-500 ${
        filter === option
        ? "bg-blue-700 text-white"
        : " text-gray-300 hover:bg-blue-700 "
      }`}
      >
        {option}
      </button>
    ))}
    </div>
  </div>

    <div className="bg-gradient-to-br from-[#192233] to-[#0c1f47] text-white rounded-xl pb-3 shadow-2xl shadow-black/50">
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-900 text-gray-200">
            <tr>
              <th className="p-3 w-[15%] border-b border-gray-700">ID</th>
              <th className="p-3 w-[15%] border-b border-gray-700">CAR ID</th>
              <th className="p-3 w-[15%] border-b border-gray-700">Name</th>
              <th className="p-3 w-[20%] border-b border-gray-700">PHONE</th>
              <th className="p-3 w-[15%] border-b border-gray-700">STATUS</th>
              <th className="p-3 w-[20%] border-b border-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {selectedDrivers.map((driver) => (
              <tr key={driver.id} className="hover:bg-[#1a1a49] transition duration-500">
                <td className="p-3 border-b border-gray-700">{driver.id}</td>
                <td className="p-3 border-b border-gray-700">{driver.car_Id}</td>
                <td className="p-3 border-b border-gray-700">{driver.name}</td>
                <td className="p-3 border-b border-gray-700">{driver.phone}</td>
                <td className="p-3 border-b border-gray-700">
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      driver.state === "Unavailable"
                        ? "bg-red-500 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {driver.state}
                  </span>
                </td>
                <td className="p-3 flex space-x-2 border-b border-gray-700">
                  <button
                    onClick={() => handleEdit(driver)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition duration-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(driver.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-3 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
          } text-white transition duration-300`}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-800 rounded text-white">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
          } text-white transition duration-300`}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default DriverTable;
