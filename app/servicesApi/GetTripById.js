import axios from "axios";

export const getTripById = async (id) => {
  try {
    const response =
      await axios.get(`https://aldeeb.runasp.net/api/Trip/${id}`);
    return response.data; // ✅ إرجاع البيانات مباشرة
  } catch (error) {
    console.error("Error fetching trip details:", error);
    return null; // ✅ تجنب تعطل التطبيق عند حدوث خطأ
  }
};
