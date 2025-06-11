"use client";
import React, { useState } from "react";
import Service from "../_components/Service";
import ServicesFormInputs from "../_components/ServicesFormInputs";
import { bookTourGuide } from "../servicesApi/SPecialServices"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServicesTour() {
  const [formData, setFormData] = useState({
    startPlace: "",
    endPlace: "",
    language: "",
    destinations: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to book a tour guide.");
      return;
    }

   
    const startDateTime = `${formData.startDate}T${formData.startTime || "00:00"}:00.000Z`;
    const endDateTime = `${formData.endDate}T${formData.endTime || "00:00"}:00.000Z`;

    const tourGuideData = {
      startPlace: formData.startPlace,
      endPlace: formData.endPlace,
      language: formData.language,
      destinations: formData.destinations,
      startDate: startDateTime,
      endDate: endDateTime,
    };

    try {
      const response = await bookTourGuide(tourGuideData);
      toast.success("Tour guide booked successfully!");
      console.log("Response:", response);

      setFormData({
        startPlace: "",
        endPlace: "",
        language: "",
        destinations: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Error booking tour guide:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen py-[3em] flex items-center justify-center">
     <div className="bg-gradient-to-br from-[#0c1f47] to-[#161132]  shadow-2xl shadow-black/60 p-8  w-[80%] lg:w-[50em] rounded-lg">
        <h1 className="text-center text-[#F2CD7E] lg:text-xl md:text-xl sm:text-lg mb-4">
          Booking your own Service
        </h1>
        <div className="mb-4 mx-auto w-fit">
          <div className="flex justify-space-between items-center gap-4 mb-4">
            <Service photoSrc="/car (2).png" title="Car" active={false} link="ServicesCar" />
            <Service photoSrc="/tour 1.png" title="Tour Guide" active={true} link="ServicesTour" />
             <Service photoSrc="/images/crown.png" title="Custom Program" active={false} link='ServicesCustomTrip' />
          </div>
        </div>
        <h2 className="mt-[1em] text-center text-[#F2CD7E] text-lg">Booking Tour Guide</h2>

        <form className="mt-[1em]" onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-2">
            <ServicesFormInputs
              label="Start Place"
              type="text"
              name="startPlace"
              value={formData.startPlace}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="End Place"
              type="text"
              name="endPlace"
              value={formData.endPlace}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Language"
              type="text"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Destinations"
              type="text"
              name="destinations"
              value={formData.destinations}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Start Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Start Time"
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="End Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="End Time"
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="mt-[1em] w-full bg-gradient-to-r from-[gray] to-[#1E2D4B] text-[#F2CD7E] py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default ServicesTour;