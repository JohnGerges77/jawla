"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { HiDotsVertical } from "react-icons/hi";

const TripsTable = ({ trips, handleEdit, handleDelete }) => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState(null); 

  const router = useRouter();

  const totalPages = Math.ceil(trips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedTrips = trips.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (tripId) => {
    router.push(`/Dashboard/TripDetails?id=${tripId}`);
  };

  const toggleDropdown = (tripId) => {
    setOpenDropdownId(openDropdownId === tripId ? null : tripId); 
  };

  return (
    <>
      <div className="bg-gradient-to-br from-[#192233] to-[#0c1f47] text-white rounded-xl pb-3">
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-left border-collapse overflow-hidden">
            <thead className="bg-gray-900 text-gray-200">
              <tr>
                <th className="p-3 border-b w-[7%] border-gray-700">ID</th>
                <th className="p-3 border-b w-[10%] border-gray-700 pl-6">
                  Image
                </th>
                <th className="p-3 border-b w-[15%] border-gray-700">Title</th>
                <th className="p-3 border-b w-[15%] border-gray-700">
                  Location
                </th>
                <th className="p-3 border-b w-[15%] border-gray-700">Price</th>
                <th className="p-3 border-b w-[15%] border-gray-700">
                  Duration
                </th>
                <th className="p-3 border-b w-[15%] border-gray-700">
                  Start Date
                </th>
                <th className="p-3 border-b w-[15%] border-gray-700 relative">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedTrips.map((trip) => {
                const isOpen = openDropdownId === trip.id;

                return (
                  <tr
                    key={trip.id || `${trip.title}-${trip.start_date}`}
                    className="hover:bg-[#1b1b45] transition duration-500"
                  >
                    <td className="p-3 border-b border-gray-700">{trip.id}</td>
                    <td className="p-3 border-b border-gray-700">
                      {trip?.main_image ? (
                        <Image
                          src={trip.main_image}
                          alt={trip.title || "Trip Image"}
                          width={100}
                          height={100}
                          className="w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-gray-300 flex items-center justify-center rounded">
                          <span className="text-gray-600 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {trip.title}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {trip.location}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {trip.price?.toLocaleString() ?? "N/A"}
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {trip.duration} days
                    </td>
                    <td className="p-3 border-b border-gray-700">
                      {trip.start_date
                        ? new Date(trip.start_date).toLocaleDateString("en-US")
                        : "N/A"}
                    </td>
                    <td className="p-3 border-b border-gray-700 relative">
                      <button
                        onClick={() => toggleDropdown(trip.id)}
                        className="text-white hover:text-gray-300 focus:outline-none"
                      >
                        <HiDotsVertical className="w-6 h-6" />
                      </button>

                      {isOpen && (
                        <div className="absolute right-24 bottom-[-5px] w-32 bg-[#11285f] rounded-lg shadow-lg z-50 py-1">
                          <ul className="py-1">
                            <li>
                              <button
                                onClick={() => {
                                  handleEdit(trip);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center text-white px-4 py-2 hover:bg-primary transition duration-300 w-[100%]"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  Swal.fire({
                                    title: "Are you sure?",
                                    text: "Do you want to delete the trip? This action cannot be undone!",
                                    icon: "warning",
                                    background: "#11285f",
                                    color: "#ffffff",
                                    showCancelButton: true,
                                    confirmButtonColor: "#d33",
                                    cancelButtonColor: "#3085d6",
                                    confirmButtonText: "Yes, delete it!",
                                    cancelButtonText: "Cancel",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      handleDelete(trip.id);
                                      Swal.fire(
                                        "Deleted!",
                                        "The trip has been deleted successfully.",
                                        "success",
                                    
                                      );
                                      setOpenDropdownId(null);
                                    }
                                  });
                                }}
                                className="flex items-center text-white px-4 py-2 hover:bg-primary transition duration-300 w-[100%]"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                                  />
                                </svg>
                                Delete
                              </button>
                            </li>
                            <li>
                              <button
                                onClick={() => {
                                  handleViewDetails(trip.id);
                                  setOpenDropdownId(null);
                                }}
                                className="flex items-center text-white px-4 py-2 hover:bg-primary  transition duration-300 w-[100%]"
                              >
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                                Details
                              </button>
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-3 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white transition duration-300`}
          >
            Prev
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded text-white">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"
            } text-white transition duration-300`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default TripsTable;