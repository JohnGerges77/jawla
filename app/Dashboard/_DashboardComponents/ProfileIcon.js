"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProfile } from "../../servicesApi/ProfileApi";
import Spinner from "@/app/_components/Spinner"; // افترضنا إن Spinner موجود

function ProfileIcon() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUserData(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);



  if (!userData) {
    return <div className="text-white">Loading user...</div>;
  }

  return (
    <div className="flex items-center space-x-[1em] w-fit pl-10">
      <Image
        src="/images/user (1).png"
        alt="user"
        width={24}
        height={24}
        className="h-[1.5em] w-auto"
      />
      <span className="w-[100%] text-[0.9em] text-white font-bold">
        {userData.username || "Unknown User"}
      </span>
    </div>
  );
}

export default ProfileIcon;