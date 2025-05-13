"use client";
import React, { useState } from "react";
import Input from "../_components/Input";
import { forgetPassword } from "../servicesApi/ForgetPasswordApi";
import Image from "next/image";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

 
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await forgetPassword(email);
      setSuccess("Reset link sent! Please check your email.");

      
      setEmail("");


      setTimeout(() => {
        window.location.href = "/LogIn";
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center bg-gray-300 min-h-[89vh]">
      <div className="bg-secondry w-[60%] flex justify-end items-center rounded-xl my-2">
        <div className="w-[35%] p-[20px]">
          <Image width={468} height={190} src="/Frame 19.png" alt="logo" />
        </div>
        <div className="bg-primary w-[65%] pt-40 rounded-xl h-[100%]">
          <div className="flex flex-col justify-center items-center">
            <div className="text-secondry font-bold relative right-14 text-2xl">
              <p>Forgot Password</p>
              <div className="bg-secondry w-[180px] h-[2px] mt-3"></div>
            </div>
            <div className="flex flex-col mt-3 w-[75%]">
              <Input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon="/email.png"
                title="Email"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading || success} 
              className="bg-secondry w-[75%] py-3 px-5 rounded-[50px] font-bold text-xl"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgetPasswordPage;
