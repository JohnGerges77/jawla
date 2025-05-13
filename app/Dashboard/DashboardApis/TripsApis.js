import axios from "axios";

const BASE_URL = "https://aldeeb.runasp.net/api/Trip";

export const getAllTrips = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetAllTrips`, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.data) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error("No data returned from server.");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch trips.";
    console.error("Get All Trips API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const addTrip = async (tripData) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddTrip`, tripData);
    return response.data;
  } catch (error) {
    console.error("Add Trip API Error:", error);
    console.error("Full Error Object:", error.toJSON?.() || error);
    throw new Error("Failed to add trip.");
  }
};

export const updateTrip = async (tripId, updatedData) => {
  console.log("بيانات الرحلة قبل الإرسال:", updatedData);
  try {
    const response = await axios.put(`${BASE_URL}/${tripId}`, updatedData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("خطأ في تحديث الرحلة:", error.response?.data?.message || "فشل في تحديث الرحلة.");
    throw new Error(error.response?.data?.message || "فشل في تحديث الرحلة.");
  }
};

export const deleteTrip = async (tripId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${tripId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Delete Trip API Error:", error.response?.data?.message || "Failed to delete trip.");
    throw new Error(error.response?.data?.message || "Failed to delete trip.");
  }
};

export const getTripReservations = async (tripId) => {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("No authentication token found.");
    }

    const response = await axios.get(`${BASE_URL}/Resevations/${tripId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (response.data) {
      console.log("Reservations Data:", response.data);
      return response.data;
    } else {
      throw new Error("No reservations data returned from server.");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Failed to fetch reservations.";
    console.error("Get Trip Reservations API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};