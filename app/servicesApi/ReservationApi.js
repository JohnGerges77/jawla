import axios from 'axios';

const API_BASE_URL = 'https://aldeeb.runasp.net/api/'; 

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

export const addReservation = async (reservationData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}Reservation/AddReservation`,
      reservationData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding reservation:', error);
    throw error;
  }
};