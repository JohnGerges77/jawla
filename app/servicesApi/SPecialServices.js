import axios from "axios";

const API_BASE_URL = "https://aldeeb.runasp.net/api/SpecialService";

export const bookCar = async (carData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/car`, carData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to book the car. Please try again.");
  }
};

export const bookTourGuide = async (tourGuideData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/tourguide`, tourGuideData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to book the tour guide. Please try again.");
  }
};

export const getSpecialServices = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch special services.");
  }
};

export const bookCustomService = async (customServiceData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/package`, customServiceData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to book the custom service. Please try again.");
  }
}

export const deleteSpecialService = async (type, id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/delete/${type}/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete the booking. Please try again.");
  }
};

export const updateSpecialServiceState = async (type, id, newState, price) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found. Please log in.");
  }
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-state/${type}/${id}`,
      { 
        state: newState,
        price: price || "" 
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update the booking state. Please try again.");
  }
};