"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthContextButton";
import AuthContextButtonSignOut from "./AuthContextButtonSignOut";
import { useAuth } from "../context/AuthContext";


function HeaderNav({menuActive , windowWidth}) {
  const pathname = usePathname();
  const { role } = useAuth();
  const menuDisplay = windowWidth<=900 && menuActive===true ? "block" : windowWidth > 900? "flex" : "hidden";
  return (
    <div
      className={`${menuDisplay!=="flex" ? `${menuDisplay} fixed left-0 top-0 w-full h-fit bg-primary transition-[height] py-14` :
          `flex justify-between items-center space-x-2 w-[75%] h-full px-[2em] 
                bg-gradient-to-r from-[#FFFFFF40] to-[#FFFFFF1A]
                rounded-bl-[2.5em] rounded-br-[2.5em]`}`}
    >
      <nav className={`${menuDisplay==="block" ? "block" : `flex space-x-[1em] text-base`}`}>
        <Link
          href="./"
          className={`${pathname === "/"
            ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
            : ""
            } text-white hover:text-gray-300 w-[6rem] mx-auto text-center my-2 py-2 rounded-3xl block`}
        >
          Home
        </Link>

        {role === "Admin" && (
          <Link
            href="./Dashboard"
            className={`${pathname === "/Dashboard"
              ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
              : ""
              } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2 py-2 rounded-3xl block`}
          >
            Dashboard
          </Link>
        )}

        <Link
      
          href="/Descover"
          className={`${pathname === "/Descover"
            ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
            : ""
            } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2  py-2 rounded-3xl block`}
        >
          Discover
        </Link>

        <Link
          href="./Profile"
          className={`${pathname === "/Profile"
            ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
            : ""
            } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2 py-2 rounded-3xl block`}
        >
          Profile
        </Link>
      </nav>

      <div className={`${menuDisplay==="block"? "flex flex-col space-y-[0.5rem]" : "flex items-center space-x-[1em]"}`}>
        <AuthContextButtonSignOut menuDisplay={menuDisplay} />
        <AuthButton menuDisplay={menuDisplay} />
      </div>
    </div>
  );
}

export default HeaderNav;