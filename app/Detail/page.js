'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import DetailsImages from "../_components/DetailsImages";
import { useSearchParams } from "next/navigation";
import { getTripById } from "../servicesApi/GetTripById";
import Link from "next/link";
import { Suspense } from "react";

// Component منفصل بيستخدم useSearchParams
function TravelDetailsContent() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id");

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [persons, setPersons] = useState(1);

  useEffect(() => {
    if (tripId) {
      getTripById(tripId)
        .then((data) => {
          setTrip(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load trip details.");
          setLoading(false);
        });
    }
  }, [tripId]);

  const increasePersons = () => setPersons(persons + 1);
  const decreasePersons = () => setPersons(persons > 1 ? persons - 1 : 1);

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const images = Array.isArray(trip.images) ? trip.images : [];

  return (
    <div className="flex flex-col lg:flex-row justify-start items-start min-h-screen bg-primary text-white p-6 md:pr-28">
      <DetailsImages images={images} />
      <div className="w-full md:pl-10">
        <h2 className="text-2xl font-bold mb-4">{trip.title}</h2>
        <p className="text-gray-300 mb-6 lg:w-[80%]">{trip.description}</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between px-5 text-xl font-semibold bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-3 rounded-lg lg:w-[80%]">
            <span className="text-white">Length</span>
            <span className="text-white">{trip.duration} Days</span>
          </div>
          <div className="flex items-center justify-between px-5 text-xl font-semibold bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-3 rounded-lg lg:w-[80%]">
            <span className="text-white">Persons</span>
            <div className="flex items-center space-x-4">
              <Image
                src="/decrement.png"
                width={27}
                height={27}
                alt="Decrement"
                className="cursor-pointer"
                onClick={decreasePersons}
              />
              <span className="text-white text-lg">
                {String(persons).padStart(2, "0")}
              </span>
              <Image
                src="/increment.png"
                width={27}
                height={27}
                alt="Increment"
                className="cursor-pointer"
                onClick={increasePersons}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Places</h3>
            <div className="flex space-x-3 w-[80%]">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Trip image ${index + 1}`}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              ))}
              {images.length === 0 && (
                <p className="text-gray-300">No images available</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center lg:w-[80%] bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-4 rounded-lg mt-4">
            <div>
              <span className="text-white text-lg font-semibold">
                {trip.price * persons} L.E
              </span>
              <span className="text-gray-200 text-sm block">
                ({persons} Persons)
              </span>
            </div>
            <Link
              href={`/Booking?id=${trip.id}&persons=${persons}`}
              className="bg-secondry px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 duration-500 text-black"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TravelDetails() {
  return (
    <Suspense fallback={<p className="text-white text-center">Loading...</p>}>
      <TravelDetailsContent />
    </Suspense>
  );
}