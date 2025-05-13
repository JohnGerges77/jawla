
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

export const addPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}Payment/AddPayment`,
      paymentData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error('Error adding payment:', error);
    throw error;
  }
};