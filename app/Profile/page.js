"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalInfo from "../_components/PersonalInfo";
import Favourites from "../_components/Favourites";
import History from "../_components/History";

function Page() {
  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LogIn"); 
      toast.error("You must be logged in to access this page.");
      return;
    }
  }, [router]);

  return (
    <div>
      <section className="bg-[#F2CD7E] w-full h-screen flex items-center justify-center">
        <div className="bg-[#1E2D4B] h-full pb-[2em] w-[80%]">
          <PersonalInfo />
          <Favourites />
          <History />
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Page;