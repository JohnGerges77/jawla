"use client";
import React, { useState, useEffect } from "react";
import {
  getDrivers,
  addDriver,
  deleteDriver,
  updateDriver,
  getDriversByCarId, 
} from "../DashboardApis/DriverApi"; 
import { getCars } from "../DashboardApis/CarsApi"; 
import DriverFormModal from "../_DashboardComponents/DriverForm"; 
import DriverTable from "../_DashboardComponents/DriverTable"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/app/_components/Spinner";

function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carId, setCarId] = useState(""); 
const [filteredDrivers, setFilteredDrivers] = useState([]); 
const [showSearchInput, setShowSearchInput] = useState(false);
  const [newDriver, setNewDriver] = useState({
    name: "",
    phone: "",
    state: "",
    car_Id: "",
  });
  const [editingDriver, setEditingDriver] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driverData, carData] = await Promise.all([getDrivers(), getCars()]);
        if (driverData) setDrivers(driverData);
        if (carData) setCars(carData);
      } catch (err) {
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filteredDrivers]);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setNewDriver({ ...newDriver, [name]: value });

    if (name === "SearchId" && value) {
      try {
        const driver = await getDriverByCarId(value);
        if (driver) {
          setNewDriver({
            name: driver.name,
            phone: driver.phone.toString(),
            state: driver.state,
            car_Id: driver.car_Id.toString(),
          });
          toast.success("Driver found!");
        } else {
          toast.warn("No driver found for this Car ID.");
        }
      } catch (error) {
        toast.error("Error fetching driver data.");
      }
    }
  };

const handleSearchByCarId = async () => {
  if (!carId.trim()) {
    toast.warn("Please enter a Car ID.");
    return;
  }

  try {
    const drivers = await getDriversByCarId(carId);
    console.log("Fetched Drivers:", drivers);

    if (Array.isArray(drivers) && drivers.length > 0) {
      setFilteredDrivers(drivers); 
      toast.success("Driver(s) found!");
    } else {
      toast.error("No driver found for this Car ID.");
      setFilteredDrivers([]); 
    }
  } catch (error) {
    toast.error("Error fetching driver data.");
  }
};
const handleResetSearch = () => {
  setFilteredDrivers([]); 
  setCarId(""); 
  toast.info("Showing all drivers");
};

const handleSearch = () => {
  if (carId.trim()) {
    handleSearchByCarId(carId);
    setShowSearchInput(false); 
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!newDriver.name || !newDriver.phone || !newDriver.state || !newDriver.car_Id) {
    toast.warn("Please fill in all fields.");
    return;
  }


  const carExists = cars.some((car) => car.id.toString() === newDriver.car_Id);
  if (!carExists) {
    toast.error("Invalid Car ID. Please enter an existing Car ID.");
    return;
  }

 
  const isCarTaken = drivers.some(
    (driver) => driver.car_Id.toString() === newDriver.car_Id && driver.id !== (editingDriver?.id || null)
  );

  if (isCarTaken) {
    toast.error("This Car ID is already assigned to another driver!");
    return;
  }

  if (editingDriver) {
    try {
      const updatedDriver = await updateDriver(editingDriver.id, {
        ...newDriver,
        id: editingDriver.id,
      });

      if (updatedDriver !== null) {
        toast.success("Driver updated successfully!");
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver.id === editingDriver.id ? { ...driver, ...newDriver } : driver
          )
        );
      } else {
        toast.error("Failed to update driver.");
      }
    } catch (error) {
      toast.error("Update request failed.");
    }
    setEditingDriver(null);
  } else {
    const addedDriver = await addDriver(newDriver);
    if (addedDriver) {
      toast.success("Driver added successfully!");
      setDrivers((prev) => [...prev, addedDriver]);
    } else {
      toast.error("Failed to add driver.");
    }
  }

  setNewDriver({ name: "", phone: "", state: "", car_Id: "" });
  setShowForm(false);
};


  const handleDelete = async (driverId) => {
    const isDeleted = await deleteDriver(driverId);
    if (isDeleted) {
      setDrivers((prev) => prev.filter((driver) => driver.id !== driverId));
      toast.success("Driver deleted successfully!");
    } else {
      toast.error("Failed to delete driver.");
    }
  };

  const handleEdit = (driver) => {
    setNewDriver({
      name: driver.name,
      phone: driver.phone.toString(),
      state: driver.state,
      car_Id: driver.car_Id.toString(),
    });
    setEditingDriver(driver);
    setShowForm(true);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );

  return (
    <div className="py-2 px-5">



      <DriverFormModal
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange} 
        newDriver={newDriver}
        setShowForm={setShowForm}
        editingDriver={editingDriver}
      />

<DriverTable drivers={filteredDrivers.length > 0 ? filteredDrivers : drivers} handleEdit={handleEdit} handleDelete={handleDelete} />


<div className="">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingDriver(null);
          setNewDriver({ name: "", phone: "", state: "", car_Id: "" });
        }}
        className="bg-blue-700 text-white px-4 py-3 rounded-lg mt-4 hover:bg-blue-600 duration-500 transition-all mx-2"
      >
        Add New Driver
      </button>

      {showSearchInput && (
        <>
          <input
            type="text"
            placeholder="Enter Car ID"
            name="SearchId"
            value={carId}
            onChange={(e) => setCarId(e.target.value)}
            className="w-[30%] py-3 px-5 bg-[#0e1b34] border border-blue-900 rounded-[50px] text-white"
          />

       
          <button
            onClick={handleSearch}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all mx-3"
          >
            Search
          </button>
          <button
           onClick={() => setShowSearchInput(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-500 transition-all duration-500"
          >
            Cancel
          </button>
        </>
      )}
    
    {!showSearchInput && (
        <button
          onClick={() => setShowSearchInput(true)}
          className="bg-blue-700 text-white px-4 py-3 rounded-lg mt-4 hover:bg-blue-600 transition-all duration-500"
        >
          Search by Car ID
        </button>
      )}

  {filteredDrivers.length > 0 && (
    <button 
      onClick={handleResetSearch} 
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition duration-300 ml-2"
    >
      Reset
    </button>
  )}
</div>
      
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default DriversPage;
