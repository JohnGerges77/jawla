import axios from "axios";

export const GetUsersNumber = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/UsersCount/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};

export const GetAvaliableTrips = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/ActiveTripsCount/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};

export const GetTripsBookings = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/ReservationCount/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};
export const GetSales = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/TotalEarnings/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};
export const GetSpicialServicesSales = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/TotalSpecialServiceEarnings/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};

export const GetLocations = async (day) => {
  try {
    const response = await axios.get(
      `https://aldeeb.runasp.net/api/Statistics/top-locations/${day}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UsersNumber:", error);
    return [];
  }
};

export const GetTotalEarningsGrouped = async (day) => {
  try {
    const response = await axios.get(`https://aldeeb.runasp.net/api/Statistics/TotalEarningsGrouped/${day}`, {
      headers: { "Content-Type": "application/json" },
    });

      return response.data.data;
 
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to fetch total earnings grouped.";
 
    throw new Error(errorMessage);
  }
};