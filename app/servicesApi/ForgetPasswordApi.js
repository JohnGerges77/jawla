import axios from "axios";

export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      "https://aldeeb.runasp.net/api/Account/forget-password",
      { email }, // ✅ Axios يتكفل بتحويل البيانات إلى JSON
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // ✅ Axios يعيد `data` مباشرة
  } catch (error) {
    // ✅ معالجة الخطأ بطريقة صحيحة من `error.response`
    const errorMessage =
      error.response?.data?.message || "Failed to send reset link. Please try again.";
    throw new Error(errorMessage);
  }
};
