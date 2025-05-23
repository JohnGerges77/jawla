'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getAllTrips, getTripReservations } from "../DashboardApis/TripsApis";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function TripDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [trip, setTrip] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reservationsLoading, setReservationsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setReservationsLoading(false);
      return;
    }

    const fetchTripDetails = async () => {
      try {
        const allTrips = await getAllTrips();
        const selectedTrip = allTrips.find((trip) => String(trip.id) === String(id));

        if (selectedTrip) {
          setTrip(selectedTrip);
        } else {
          console.error(`Trip with ID ${id} not found in the response`);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchReservations = async () => {
      try {
        const reservationsData = await getTripReservations(id);
        setReservations(reservationsData);
      } catch (error) {
        console.error("Error fetching reservations:", error.message);
      } finally {
        setReservationsLoading(false);
      }
    };

    fetchTripDetails();
    fetchReservations();
  }, [id]);

  if (loading) return <Spinner />;
  if (!trip) return <div className="text-center py-10 text-secondry">No trip found with ID: {id}</div>;

  const images = Array.isArray(trip.images) ? trip.images : [];

  return (
    <div className="min-h-screen text-white p-6 md:p-12 rounded-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{trip.title || "N/A"}</h2>
        <p className="text-gray-300 mb-8 text-lg leading-relaxed">{trip.description || "No description available"}</p>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-6 py-4 text-lg font-semibold bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md transition-all hover:shadow-lg">
            <span>ID</span>
            <span>{trip.id}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-lg font-semibold bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md transition-all hover:shadow-lg">
            <span>Location</span>
            <span>{trip.location || "N/A"}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-lg font-semibold bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md transition-all hover:shadow-lg">
            <span>Start Date</span>
            <span>{trip.start_date ? new Date(trip.start_date).toLocaleDateString("en-US") : "N/A"}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-lg font-semibold bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md transition-all hover:shadow-lg">
            <span>State</span>
            <span>{trip.state || "N/A"}</span>
          </div>

          <div className="flex items-center justify-between px-6 py-4 text-lg font-semibold bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md transition-all hover:shadow-lg">
            <span>Type</span>
            <span>{trip.types || "N/A"}</span>
          </div>

          <div className="px-6 py-4 bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Places</h3>
            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`Place ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-32 rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No additional places available</p>
            )}
          </div>

          <div className="px-6 py-4 bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Cars</h3>
            {trip.cars?.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-200">
                {trip.cars.map((car) => (
                  <li key={car.id} className="mb-2">
                    ID: {car.id} - State: {car.state} - Capacity: {car.capacity} - License: {car.license}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No cars assigned</p>
            )}
          </div>

          <div className="px-6 py-4 bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Tour Guides</h3>
            {trip.tourguides?.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-200">
                {trip.tourguides.map((guide) => (
                  <li key={guide.id} className="mb-2">
                    ID: {guide.id} - Name: {guide.name} - Language: {guide.language} - Phone: {guide.phone} - State: {guide.state}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No tour guides assigned</p>
            )}
          </div>

          <div className="px-6 py-4 bg-gradient-to-br from-[#0c1f47] to-[#161132] rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-4">Reservations</h3>
            {reservationsLoading ? (
              <p className="text-gray-400">Loading reservations...</p>
            ) : reservations.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-200">
                {reservations.map((reservation) => (
                  <li key={reservation.id} className="mb-2">
                    ID: {reservation.user_Id} - Total Price: {reservation.total_price || "N/A"} - Date: {reservation.dateCreated}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No reservations found for this trip.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-br from-[#0c1f47] to-[#161132] p-6 rounded-xl shadow-md mt-6">
            <div className="mb-4 sm:mb-0">
              <span className="text-2xl font-bold">
                {trip.price ? `${trip.price.toLocaleString()} L.E` : "N/A"}
              </span>
              <span className="text-gray-400 text-sm block">(Price per person)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TripDetailsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <TripDetailsContent />
    </Suspense>
  );
}