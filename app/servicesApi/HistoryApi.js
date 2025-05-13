import axios from 'axios';

const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); 
  return {
    headers: { Authorization: `Bearer ${token}` }, 
  };
};

export const getUserTrips = async () => {
  try {
    const response = await axios.get(
      'https://aldeeb.runasp.net/api/History/user-trips',
      getAuthHeaders()
    );
    console.log('Full Response from getUserTrips:', response.data); // تسجيل الاستجابة الكاملة
    // لو الاستجابة object واحد، حولها لمصفوفة
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching user trips:", error.response?.data || error.message);
    throw new Error('Failed to fetch user trips');
  }
};

export const deleteUserTrip = async (type, id) => {
  try {
    const response = await axios.delete(
      `https://aldeeb.runasp.net/api/History/user-delete/${type}/${id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user trip:", error.response?.data || error.message);
    throw new Error('Failed to delete trip');
  }
};