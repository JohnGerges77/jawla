"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

function AuthContextButtonSignOut({ menuDisplay }) {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {!isLoggedIn ?
        <div className={`bg-[#F2CD7E] text-gray-700 rounded-3xl text-center py-2 w-[6.5rem] ${menuDisplay==="block"? "block mx-auto" : ""} `}>
          <Link href="Registration">Sign up</Link>
        </div> : ""}
    </div>
  );
}

export default AuthContextButtonSignOut;
