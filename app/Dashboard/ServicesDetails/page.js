'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSpecialServices, deleteSpecialService, updateSpecialServiceState } from "../../servicesApi/SPecialServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function BookingDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  const [selectedState, setSelectedState] = useState("Pending");
  const router = useRouter();

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const data = await getSpecialServices();
        console.log("API Response:", data);
        console.log("URL ID:", id);

        const allBookings = [
          ...(data.carBookings || []),
          ...(data.tourGuideBookings || []),
          ...(data.packageBookings || []),
        ];

        const foundBooking = allBookings.find((b) => String(b.id) === String(id));
        setBooking(foundBooking);
        setPrice(foundBooking?.price || '');
        setSelectedState(foundBooking?.state || "Pending");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [id]);

  const getBookingType = (booking) => {
    if (booking.receivePlace) return "car";
    if (booking.startPlace || booking.destinations) return "tour guide";
    if (booking.description) return "package";
    return null;
  };

  const handleDelete = async () => {
    if (!booking) {
      toast.error("No booking found to delete.");
      return;
    }

    const type = getBookingType(booking);
    if (!type) {
      toast.error("Unable to determine booking type.");
      return;
    }

    console.log(`Attempting to delete: type=${type}, id=${id}`);

    try {
      await deleteSpecialService(type, id);
      toast.success("Booking deleted successfully!");
      setTimeout(() => router.push("/Dashboard/Custom_Programs"), 2000);
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error(error.message);
    }
  };

  const handleUpdateState = async () => {
    if (!booking) return;

    const type = getBookingType(booking);
    if (!type) {
      toast.error("Unable to determine booking type.");
      return;
    }

    try {
      await updateSpecialServiceState(type, id, selectedState, price);
      toast.success(`Booking state updated to ${selectedState}!`);
      setTimeout(() => {
        router.push('/Dashboard/Custom_Programs');
      }, 2000);
      setBooking({ ...booking, state: selectedState, price: price });
    } catch (error) {
      console.error("Error updating booking state:", error);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!booking) {
    return <div className="text-center py-10">Booking not found.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gradient-to-br from-[#0c1f47] to-[#161132] px-8 py-2 w-[80%] lg:w-[50em] text-[#F2CD7E] rounded-2xl shadow-2xl shadow-black/60">
        <h1 className="text-3xl text-center mb-6">Booking Details (ID: {booking.id})</h1>
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(booking).map(([key, value]) => (
            <div key={key} className="flex justify-between border-b border-gray-600 py-2">
              <span className="font-semibold capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
              <span>
                {key === "startDate" || key === "endDate" ? (
                  <>
                    {new Date(value).toLocaleDateString()}
                    <br />
                    {new Date(value).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </>
                ) : typeof value === "boolean" ? (
                  value ? "Yes" : "No"
                ) : (
                  value
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-[#F2CD7E] font-semibold mb-1">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value || 0)}
            className="w-full p-2 rounded bg-[#1E2D4B] text-[#F2CD7E] border border-gray-600 focus:outline-none focus:border-[#F2CD7E]"
            placeholder="Enter price (required)"
          />
        </div>
        <div className="mt-4">
          <label className="block text-[#F2CD7E] font-semibold mb-1">State:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-2 rounded bg-[#1E2D4B] text-[#F2CD7E] border border-gray-600 focus:outline-none focus:border-[#F2CD7E]"
          >
            <option value="Pending">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div className="grid grid-cols-3 mt-6 gap-4">
          <Link href="/Dashboard">
            <button className="w-full bg-gradient-to-r from-gray-500 to-[#1E2D4B] text-[#F2CD7E] py-2 rounded">
              Back to Dashboard
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white py-2 rounded hover:bg-red-700 transition duration-300"
          >
            Delete Booking
          </button>
          <button
            onClick={handleUpdateState}
            className="w-full bg-gradient-to-r from-green-600 to-green-800 text-white py-2 rounded hover:bg-green-700 transition duration-300"
          >
            Submit Update
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default function BookingDetails() {
  return (
    <Suspense fallback={<Spinner />}>
      <BookingDetailsContent />
    </Suspense>
  );
}