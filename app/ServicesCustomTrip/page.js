"use client";
import React, { useState } from "react";
import Service from "../_components/Service";
import ServicesFormInputs from "../_components/ServicesFormInputs";
import { bookCustomService } from "../servicesApi/SPecialServices"; // تأكد من المسار
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [formData, setFormData] = useState({
    numberOfPersons: 0,
    addCar: false,
    addGuide: false,
    language: "",
    description: "",
    start_place: "",  // أضفنا start_place
    end_place: "",    // أضفنا end_place
    carType: "",      // أضفنا carType
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : name === "numberOfPersons" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to book a custom service.");
      return;
    }

    // تحويل التاريخ والوقت لصيغة ISO 8601
    const startDateTime = `${formData.startDate}T${formData.startTime || "00:00"}:00.000Z`;
    const endDateTime = `${formData.endDate}T${formData.endTime || "00:00"}:00.000Z`;

    const customServiceData = {
      numberOfPersons: formData.numberOfPersons,
      addCar: formData.addCar,
      addGuide: formData.addGuide,
      language: formData.language,
      description: formData.description,
      start_place: formData.start_place,  // أضفنا start_place
      end_place: formData.end_place,      // أضفنا end_place
      carType: formData.carType,          // أضفنا carType
      startDate: startDateTime,
      endDate: endDateTime,
    };

    try {
      const response = await bookCustomService(customServiceData);
      toast.success("Custom service booked successfully!");
      console.log("Response:", response);
 
      setFormData({
        numberOfPersons: 0,
        addCar: false,
        addGuide: false,
        language: "",
        description: "",
        start_place: "",
        end_place: "",
        carType: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });
    } catch (error) {
      console.error("Error booking custom service:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen py-[5em] flex items-center justify-center bg-[#F2CD7E]">
      <div className="bg-[#1E2D4B] p-8 shadow-lg w-[80%] lg:w-[50em] rounded-lg">
        <h1 className="text-center text-[#F2CD7E] lg:text-xl md:text-xl sm:text-lg mb-4">
          Booking your own Service
        </h1>
        <div className="mb-4 mx-auto w-fit">
          <div className="flex justify-space-between items-center gap-4 mb-4">
            <Service photoSrc="/car (2).png" title="Car" active={false} link="ServicesCar" />
            <Service photoSrc="/tour.png" title="Tour Guide" active={false} link="ServicesTour" />
            <Service photoSrc="/images/crown (1).png" title="Custom Program" active={true} link="ServicesCustomTrip" />
          </div>
        </div>
        <h2 className="mt-[1em] text-center text-[#F2CD7E] text-lg">Booking Custom Service</h2>

        <form className="mt-[1em]" onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 lg:gap-4 grid-cols-1 gap-2">
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
            <ServicesFormInputs
              label="Number of Persons"
              type="number"
              name="numberOfPersons"
              value={formData.numberOfPersons}
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
              label="Description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Start Place"
              type="text"
              name="start_place"
              value={formData.start_place}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="End Place"
              type="text"
              name="end_place"
              value={formData.end_place}
              onChange={handleInputChange}
            />
            <ServicesFormInputs
              label="Car Type"
              type="text"
              name="carType"
              value={formData.carType}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-2 text-[#F2CD7E]">
              <input
                type="checkbox"
                name="addCar"
                checked={formData.addCar}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <label>Add Car</label>
            </div>
            <div className="flex items-center gap-2 text-[#F2CD7E]">
              <input
                type="checkbox"
                name="addGuide"
                checked={formData.addGuide}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <label>Add Guide</label>
            </div>
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

export default Page;