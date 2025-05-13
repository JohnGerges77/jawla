import axios from "axios";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      "https://aldeeb.runasp.net/api/Account/Login",
      {
        username: credentials.username,
        password: credentials.password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    
    return response.data; 
  } catch (error) {
 
    throw new Error(error.response?.data?.error || "User Name or Password is incorrect");
  }
};
