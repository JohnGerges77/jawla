"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "../_components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../servicesApi/loginAPi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);

    try {
      const result = await loginUser(formData);
      console.log(result.role);
      login(result.token, result.role);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        if (result.role === "Admin") {
          router.push("/Dashboard");
        } else {
          router.push("/");
        }
      },);
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex w-full justify-center h-[100vh] md:h-screen box-border bg-secondry  md:bg-gray-300">
      <section className="w-[100%] block h-fit justify-center  md:w-[60%] md:flex mt-12 ">
        <ToastContainer position="top-center" autoClose={2500} />
        <div className=" bg-transparent md:bg-secondry w-full block  md:h-auto  justify-between items-center md:rounded-xl my-2 md:flex">
          <div className=" w-full h-fit  md:h-auto md:w-[35%] rounded-xl">
            <Image width={200} height={81} src="/Frame 19.png" alt="logo" className="block mx-auto" />
          </div>

          <div className="bg-primary w-[90%] max-w-[500px] md:max-w-none mt-2 md:mt-0 md:w-[65%] pt-20 pb-20 rounded-xl md:rounded-tl-none md:rounded-bl-none  h-fit md:h-[100%] mx-auto md:mx-0">
            <div className="flex flex-col justify-center items-center" >
              <div className="text-secondry font-bold relative right-0 text-2xl w-[75%]">
                <p>Log in</p>
                <div className="bg-secondry w-[180px] h-[2px] mt-3"></div>
              </div>

              <div className="flex flex-col mt-3 w-[75%]">
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  icon="/images/user (1).png"
                  title="User Name"
                />

                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  icon={"/images/hide.png"}
                  title="Password"
                />

                <div className="text-gray-200 py-4 flex justify-end items-end ">
                  <Link href="/ForgetPassword" className="hover:text-[#F2CD7E]">Forgot Password?</Link>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-secondry text-primary w-[75%] py-3 px-5 rounded-[50px] font-bold text-xl hover:bg-white transition-colors"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
              <p className="text-gray-200 mt-5 ">
                Don’t have an account?{" "}
                <Link href="/Registration" className="text-secondry font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default LoginPage;