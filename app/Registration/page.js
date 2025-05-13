"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "../servicesApi/registerApi"; // استيراد API

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  function validatePassword(password) {
    const minLength = 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[@$!%*?&]/;

    if (password.length < minLength) return "Password must be at least 8 characters long.";
    if (!uppercaseRegex.test(password)) return "Password must contain at least one uppercase letter.";
    if (!lowercaseRegex.test(password)) return "Password must contain at least one lowercase letter.";
    if (!digitRegex.test(password)) return "Password must contain at least one number.";
    if (!specialCharRegex.test(password)) return "Password must contain at least one special character (@$!%*?&).";

    return "Valid password!";
  }

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!formData.username.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const passwordValidationMessage = validatePassword(formData.password);
    if (passwordValidationMessage !== "Valid password!") {
      setError("Please enter a valid password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess("Registration successful!");
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        router.push("/LogIn");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);

      let errorMessage = "Registration failed. Please try again.";

      if (err.response) {

        if (typeof err.response.data?.errors === "string") {
          errorMessage = err.response.data.errors;
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {

        errorMessage = err.message;
      }

      setError(errorMessage);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full h-fit py-10 justify-center bg-secondry lg:bg-gray-300 ">
      <div className="bg-secondry w-full lg:w-[60%] lg:flex justify-end items-center rounded-xl">
        <div className="w-full h-fit  lg:h-auto lg:w-[35%] rounded-xl">
          <Image width={200} height={81} src="/Frame 19.png" alt="logo" className="block mx-auto" />
        </div>

        <div className="py-12 lg:rounded-tr-xl lg:rounded-br-xl bg-primary w-[90%] max-w-[500px] lg:max-w-none mt-5 lg:mt-0 md:w-[65%] pt-20 pb-20 rounded-xl h-fit lg:h-[100%] mx-auto lg:mx-0">
          <div className="flex flex-col justify-center items-center">
            <div className="text-secondry font-bold relative right-0 w-[75%] text-2xl">
              <p>Registration</p>
              <div className="bg-secondry w-[250px] h-[2px] mt-3"></div>
            </div>

            <div className="flex flex-col gap-2 mt-3 w-[75%]">
              <Input name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" icon="/images/user (1).png" title="Username" />
              <Input name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" icon="/images/email.png" title="Email" />
              <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Your Phone" icon="/images/phone-call.png" title="Phone Number" />
              <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" icon="/images/hide.png" title="Password" />
              <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Your Password" icon="/images/hide.png" title="Confirm Password" />
            </div>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}

            <button onClick={handleSubmit} disabled={loading} className="bg-secondry text-primary hover:bg-white w-[75%] py-3 px-5 rounded-[50px] font-bold text-xl mt-4">
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="text-gray-200 mt-5">
              Already have an account?{" "}
              <Link href="/LogIn" className="text-secondry font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
