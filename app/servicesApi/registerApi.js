import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://aldeeb.runasp.net/api/Account/Register",
      userData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data; 
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data?.errors || error.response.data?.message;

   
      if (errorMessage && errorMessage.toLowerCase().includes("username")) {
        throw new Error("Username is already taken. Please choose another one.");
      }

      throw new Error(errorMessage || "Registration failed");
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
};
