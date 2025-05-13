"use client";
import React, { useState, useEffect } from "react";
import DetailsImages from "../_components/DetailsImages";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getTripById } from "../servicesApi/GetTripById"; // استيراد API


const TravelDetails = () => {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id"); 
  const persons = Number(searchParams.get("persons")) || 1;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  const totalPrice = trip.price * persons; // حساب السعر الإجمالي
  const images = Array.isArray(trip.images) ? trip.images : [];
  return (
    <div className="flex flex-col md:flex-row justify-start items-start min-h-screen bg-primary text-white p-6 md:pr-28">
     <DetailsImages images={images} />
      <div className="w-full md:pl-10 mt-28">
        <div className="space-y-4">
          {/* Order ID */}
          <div className="flex items-center justify-between px-5 text-xl bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-3 rounded-lg sm:w-[80%] font-thin">
            <span className="text-white">Order ID</span>
            <span className="text-white">{trip.id}</span>
          </div>

          {/* Amount (عدد الأشخاص) */}
          <div className="flex items-center justify-between px-5 text-xl font-thin bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-3 rounded-lg sm:w-[80%]">
            <span className="text-white">Persons</span>
            <span className="text-white">{persons}</span>
          </div>

          <div className="flex items-center justify-between px-5 text-xl font-thin bg-gradient-to-r from-[#FFFFFF70] to-[#FFFFFF30] backdrop-blur-sm p-3 rounded-lg sm:w-[80%]">
            <span className="text-white">Total</span>
            <span className="text-white">{totalPrice} L.E</span>
          </div>

         
          <div className="bg-[#FFFFFF70] sm:w-[50%] h-[2px] mt-3 ml-24"></div>

          
          <div>
            <h1 className="text-secondry font-semibold text-2xl ">Payment Method</h1>
            <Link
              href={`/Payment?id=${trip.id}&total=${totalPrice}&persons=${persons}`}
              className="flex justify-between items-center sm:w-[80%] bg-secondry backdrop-blur-sm p-2 rounded-lg mt-7"
            >
              <span className="text-black text-2xl font-semibold flex gap-3 pl-20">
                <Image src="/paypal.png" alt="paypal" width={37} height={37} />
                PayPal
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDetails;
