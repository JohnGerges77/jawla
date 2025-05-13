import axios from "axios";

const BASE_URL = "https://aldeeb.runasp.net/api/Tourguide";

export const getTourGuides = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tour guides:", error);
    return [];
  }
};

export const addTourGuide = async (tourGuideData) => {
  try {
    const response = await axios.post(BASE_URL, tourGuideData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding tour guide:", error);
    return null;
  }
};

export const deleteTourGuide = async (tourGuideId) => {
  try {
    await axios.delete(`${BASE_URL}/${tourGuideId}`);
    return true;
  } catch (error) {
    console.error("Error deleting tour guide:", error);
    return false;
  }
};

export const updateTourGuide = async (tourGuideId, updatedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${tourGuideId}`, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating tour guide:", error);
    return null;
  }
};