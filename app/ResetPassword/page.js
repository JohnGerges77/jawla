'use client';
import React, { useState } from "react";
import Input from "../_components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "../servicesApi/resetPasswordApi";
import Image from "next/image";
import { Suspense } from "react";

function ResetPasswordContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userEmail = searchParams.get("code");

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!token) {
      setError("Invalid token. Please request a new reset link.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword({ email, token, newPassword: password });
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => router.push("/LogIn"), 3000);
    } catch (err) {
      setError(err.message || "Failed to reset password. Please try again.");
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
              <p>Reset Password</p>
              <div className="bg-secondry w-[180px] h-[2px] mt-3"></div>
            </div>
            <div className="flex flex-col mt-3 w-[75%]">
              <Input
                name="email"
                type="email"
                value={userEmail}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon="/email.png"
                title="Email"
              />
              <Input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                icon={"/images/hide.png"}
                title="New Password"
              />
              <Input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                icon={"/images/hide.png"}
                title="Confirm Password"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading || success}
              className="bg-secondry w-[75%] py-3 px-5 rounded-[50px] font-bold text-xl"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<p className="text-center text-white">Loading...</p>}>
      <ResetPasswordContent />
    </Suspense>
  );
}