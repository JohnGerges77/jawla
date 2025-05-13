"use client";
import React, { useState, useEffect } from "react";
import {
  getCars,
  addCar,
  deleteCar,
  updateCar,
} from "../DashboardApis/CarsApi";
import CarFormModal from "../_DashboardComponents/CarForm";
import CarTable from "../_DashboardComponents/CarTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/app/_components/Spinner";

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCar, setNewCar] = useState({
    state: "",
    capacity: "",
    license: "",
  });
  const [editingCar, setEditingCar] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCars();
        if (!data || data.length === 0) {
      
        } else {
          setCars(data);
        }
      } catch (err) {
       
        toast.error(" Failed to fetch cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCar.state || !newCar.capacity || !newCar.license) {
      toast.warn(" Please fill in all fields.");
      return;
    }

    const carData = {
      ...newCar,
      capacity: parseInt(newCar.capacity, 10),
    };

    if (editingCar) {
      try {
        const updatedCar = await updateCar(editingCar.id, {
          ...carData,
          id: editingCar.id,
        });

        if (updatedCar !== null) {
          toast.success("Car updated successfully!");
          setCars((prevCars) =>
            prevCars.map((car) =>
              car.id === editingCar.id ? { ...car, ...carData } : car
            )
          );
        } else {
          toast.error("Failed to update car.");
        }
      } catch (error) {
        console.error("Update failed:", error);
        toast.error("Update request failed.");
      }
      setEditingCar(null);
    } else {
      const addedCar = await addCar(carData);
      if (addedCar) {
        toast.success("Car added successfully!");
        setCars((prevCars) => [...prevCars, addedCar]);
      } else {
        toast.error("Failed to add car.");
      }
    }

    setNewCar({ state: "", capacity: "", license: "" });
    setShowForm(false);
  };

  const handleDelete = async (carId) => {
    const isDeleted = await deleteCar(carId);
    if (isDeleted) {
      setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
      toast.success(" Car deleted successfully!");
    } else {
      toast.error(" Failed to delete car.");
    }
  };

  const handleEdit = (car) => {
    setNewCar({
      state: car.state,
      capacity: car.capacity.toString(),
      license: car.license,
    });
    setEditingCar(car);
    setShowForm(true);
  
  };

  if (loading) return <Spinner />;



 

  return (
    <div className="p-2">
      <CarFormModal
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newCar={newCar}
        setShowForm={setShowForm}
        editingCar={editingCar}
      />

      <CarTable
        cars={cars}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingCar(null);
          setNewCar({ state: "", capacity: "", license: "" });
        }}
        className="bg-blue-700 text-white px-4 py-3 rounded-lg mt-4 hover:bg-blue-600 duration-500 transition-all"
      >
        Add New Car
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default CarsPage;
