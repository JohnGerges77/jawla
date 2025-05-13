"use client";
import React, { useState, useEffect } from "react";
import { getSpecialServices } from "../../servicesApi/SPecialServices"; // تأكد من المسار
import ServicesTable from "../_DashboardComponents/ServicesTable"; // تأكد من المسار
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/app/_components/Spinner";

function Page() {
  const [carBookings, setCarBookings] = useState([]);
  const [tourGuideBookings, setTourGuideBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getSpecialServices();
        setCarBookings(data.carBookings || []);
        setTourGuideBookings(data.tourGuideBookings || []);
        setPackageBookings(data.packageBookings || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error(error.message);
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return <Spinner />;
  }



  return (
    <div className="min-h-screen ">
      
      <div className=" space-y-8  p-2">
        <ServicesTable bookings={carBookings} title="Car Bookings" type='car' />
        <ServicesTable bookings={tourGuideBookings} title="Tour Guide Bookings" type='tourGuide'  />
        <ServicesTable bookings={packageBookings} title="Custom Trips" type='package'  />
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Page;