import axios from "axios";

export const getAllTrips = async () => {
  try {
    const response = await axios.get("https://aldeeb.runasp.net/api/Trip/GetAllTrips", {
      headers: { "Content-Type": "application/json" },
    });

    return response.data; // ✅ Axios يعيد `data` مباشرة
  } catch (error) {
    // ✅ استخراج رسالة الخطأ من `error.response`
    const errorMessage = error.response?.data?.message || "Failed to fetch trips.";
    console.error("Get All Trips API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};
