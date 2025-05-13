"use client";
import React, { useState, useEffect } from "react";
import {
  getAllTrips,
  addTrip,
  deleteTrip,
  updateTrip,
} from "../DashboardApis/TripsApis";
import TripFormModal from "../_DashboardComponents/TripForm";
import TripsTable from "../_DashboardComponents/TripsTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/app/_components/Spinner";

function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrip, setNewTrip] = useState({
    id: "",
    title: "",
    location: "",
    description: "",
    state: "",
    types: "",
    carIds: "",
    tourguideIds: "",
    start_date: "",
    price: "",
    duration: "",
    persons: "",
    main_image: null,
    images: null,
  });
  const [editingTrip, setEditingTrip] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTrips = async () => {
    try {
      const data = await getAllTrips();
      setTrips(data || []);
    } catch (err) {
      toast.error("Failed to fetch trips.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setNewTrip((prevTrip) => ({
        ...prevTrip,
        images: prevTrip.images ? [...prevTrip.images, ...value] : [...value],
      }));
    } else {
      setNewTrip((prevTrip) => ({
        ...prevTrip,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const fieldMapping = {
      id: "id",
      title: "Title",
      location: "Location",
      description: "Description",
      state: "State",
      types: "types",
      carIds: "CarIds",
      tourguideIds: "TourguideIds",
      start_date: "start_date",
      price: "Price",
      duration: "Duration",
      persons: "Persons",
      main_image: "Main_image",
      images: "Images",
    };

    Object.keys(newTrip).forEach((key) => {
      const mappedKey = fieldMapping[key] || key;
      const value = newTrip[key];

      if (key === "main_image" && value) {
        formData.append(mappedKey, value);
      } else if (key === "images" && value) {
        for (let i = 0; i < value.length; i++) {
          formData.append("Images", value[i]);
        }
      } else {
        formData.append(mappedKey, value || "");
      }
    });

    console.log("Data sent in FormData:");
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      if (editingTrip) {
        // Update an existing trip
        await updateTrip(editingTrip.id, formData);
        toast.success("Trip updated successfully!");
      } else {
        // Add a new trip
        await addTrip(formData);
        toast.success("Trip added successfully!");
      }
      // Fetch all trips after any operation (add or update) to ensure state is updated with images
      await fetchTrips();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit the trip.");
    }

    // Reset the form after submission
    setNewTrip({
      id: "",
      title: "",
      location: "",
      description: "",
      state: "",
      types: "",
      carIds: "",
      tourguideIds: "",
      start_date: "",
      price: "",
      duration: "",
      persons: "",
      main_image: null,
      images: null,
    });
    setEditingTrip(null);
    setShowForm(false);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setNewTrip({
      id: trip.id || "",
      title: trip.title || "",
      location: trip.location || "",
      description: trip.description || "",
      state: trip.state || "",
      types: trip.types || "",
      carIds: trip.cars?.map((car) => car.id).join(",") || "",
      tourguideIds: trip.tourguides?.map((guide) => guide.id).join(",") || "",
      start_date: trip.start_date || "",
      price: trip.price || "",
      duration: trip.duration || "",
      persons: trip.persons || "",
      main_image: null,
      images: null,
    });
    setShowForm(true);
  };

  const handleDelete = async (tripId) => {
    const isDeleted = await deleteTrip(tripId);
    if (isDeleted) {
    
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      toast.success("Trip deleted successfully!");
    } else {
      toast.error("Failed to delete the trip.");
    }
  };



  if (loading) return <Spinner />;

  return (
    <div className="p-2">
      <TripFormModal
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newTrip={newTrip}
        setShowForm={setShowForm}
        editingTrip={editingTrip}
      />

      <TripsTable
        trips={trips}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
     
      />

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingTrip(null);
          setNewTrip({
            id: "",
            title: "",
            location: "",
            description: "",
            state: "",
            types: "",
            carIds: "",
            tourguideIds: "",
            start_date: "",
            price: "",
            duration: "",
            persons: "",
            main_image: null,
            images: null,
          });
        }}
        className="bg-blue-700 text-white px-4 py-3 rounded-lg mt-4 hover:bg-blue-600 duration-500 transition-all"
      >
        Add New Trip
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default TripsPage;