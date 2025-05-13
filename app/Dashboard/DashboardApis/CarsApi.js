import axios from "axios";

const BASE_URL = "https://aldeeb.runasp.net/api/Car";

export const getCars = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const addCar = async (carData) => {
  try {
    const response = await axios.post(BASE_URL, carData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding car:", error);
    return null;
  }
};

export const deleteCar = async (carId) => {
  try {
    await axios.delete(`${BASE_URL}/${carId}`);
    return true;
  } catch (error) {
    console.error("Error deleting car:", error);
    return false;
  }
};


export const updateCar = async (carId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${carId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating car:", error);
    return null;
  }
};
