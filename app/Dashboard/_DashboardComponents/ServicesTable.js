"use client"; // إضافة "use client" للتأكد إن الكومبوننت Client-Side
import React, { useState } from "react";
import Link from "next/link";
import { deleteSpecialService } from "../../servicesApi/SPecialServices";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// تحميل ToastContainer ديناميكيًا لتجنب مشاكل SSR
const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServicesTable = ({ bookings, title, type }) => {
  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [localBookings, setLocalBookings] = useState(bookings); // إضافة state محلي لتتبع الحجوزات
  const router = useRouter();

  // تحديث localBookings لما bookings تتغير (مثلًا لو جت بيانات جديدة من الـ API)
  React.useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const filteredBookings = localBookings.filter((booking) => {
    if (filter === "Pending") return booking.state === "Pending";
    if (filter === "Accepted") return booking.state === "Accepted";
    if (filter === "Rejected") return booking.state === "Rejected";
    return true;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const carColumns = [
    { key: "id", label: "ID" },
    { key: "receivePlace", label: "Receive Place" },
    { key: "numberOfPersons", label: "Persons" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "state", label: "State" },
    { key: "details", label: "Details" },
  ];

  const tourGuideColumns = [
    { key: "id", label: "ID" },
    { key: "startPlace", label: "Start Place" },
    { key: "language", label: "Language" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "state", label: "State" },
    { key: "details", label: "Details" },
  ];

  const packageColumns = [
    { key: "id", label: "ID" },
    { key: "start_place", label: "Start place" },
    { key: "numberOfPersons", label: "Persons" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "state", label: "State" },
    { key: "details", label: "Details" },
  ];

  const tableColumns =
    type === "car"
      ? carColumns
      : type === "tourGuide"
      ? tourGuideColumns
      : type === "package"
      ? packageColumns
      : [
          { key: "id", label: "ID" },
          { key: "startDate", label: "Start Date" },
          { key: "endDate", label: "End Date" },
          { key: "state", label: "State" },
          { key: "details", label: "Details" },
        ];

  const handleDelete = async (bookingId) => {
    try {
      await deleteSpecialService(type, bookingId);
      // تحديث localBookings بحذف الحجز من القائمة
      setLocalBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
  toast.success("Booking deleted successfully!");
  } catch (error) {
    console.error("Error deleting booking:", error);
    toast.error(error.message);
  }
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <div className="bg-[#192233] p-1 space-x-2 rounded-lg">
          {["All", "Pending", "Accepted", "Rejected"].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-3 py-1 rounded transition duration-500 ${
                filter === option
                  ? "bg-blue-700 text-white"
                  : "text-gray-300 hover:bg-blue-700"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#192233] to-[#0c1f47] text-white rounded-xl pb-3 shadow-2xl shadow-black/50">
        <h2 className="text-xl font-semibold p-3 text-center text-secondry">
          {title}
        </h2>
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-900 text-gray-200">
              <tr>
                {tableColumns.map((col) => (
                  <th key={col.key} className="p-3 border-b border-gray-700">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-[#1b1b45] transition duration-500"
                >
                  {tableColumns.map((col) => (
                    <td
                      key={col.key}
                      className="p-3 border-b border-gray-700 max-w-[150px] overflow-hidden overflow-wrap break-words whitespace-normal"
                    >
                      {col.key === "state" ? (
                        <span
                          className={`px-3 py-1 rounded-md text-sm font-medium ${
                            booking.state === "Pending"
                              ? "bg-yellow-500 text-black"
                              : booking.state === "Rejected"
                              ? "bg-red-500 text-white"
                              : booking.state === "Accepted"
                              ? "bg-green-600 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {booking.state}
                        </span>
                      ) : col.key === "startDate" || col.key === "endDate" ? (
                        <div>
                          {new Date(booking[col.key]).toLocaleDateString()}
                          <br />
                          {new Date(booking[col.key]).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </div>
                      ) : col.key === "details" ? (
                        <div className="flex space-x-2">
                          <Link href={`ServicesDetails?id=${booking.id}`}>
                            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300">
                           Details
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                          >
                          Delete
                          </button>
                        </div>
                      ) : (
                        booking[col.key]
                      )}
                    </td>
                  ))}
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
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default ServicesTable;