import axios from "axios";

const BASE_URL = "https://aldeeb.runasp.net/api/Driver";

export const getDrivers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return [];
  }
};

export const addDriver = async (driverData) => {
  try {
    const response = await axios.post(BASE_URL, driverData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding driver:", error);
    return null;
  }
};

export const deleteDriver = async (driverId) => {
  try {
    await axios.delete(`${BASE_URL}/${driverId}`);
    return true;
  } catch (error) {
    console.error("Error deleting driver:", error);
    return false;
  }
};

export const updateDriver = async (driverId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${driverId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating driver:", error);
    return null;
  }
};


export const getDriversByCarId = async (carId) => {
    try {
      const response = await axios.get(`${BASE_URL}/ByCar/${carId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching drivers by car ID:", error);
      return null; 
    }
  };