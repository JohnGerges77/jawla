import axios from "axios";

export const resetPassword = async ({ email, token, newPassword }) => {
  try {
    const response = await axios.post(
      "https://aldeeb.runasp.net/api/Account/reset-password",
      { email, token, newPassword }, // ✅ Axios يتعامل مع JSON تلقائيًا
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; // ✅ Axios يعيد `data` مباشرة
  } catch (error) {
    // ✅ استخراج رسالة الخطأ من `error.response`
    const errorMessage =
      error.response?.data?.message || "Failed to reset password. Please try again.";
    console.error("Reset Password API Error:", errorMessage); // ✅ طباعة الخطأ في الـ Console
    throw new Error(errorMessage);
  }
};
