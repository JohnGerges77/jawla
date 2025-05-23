"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthButton from "./AuthContextButton";
import AuthContextButtonSignOut from "./AuthContextButtonSignOut";
import { useAuth } from "../context/AuthContext";

function HeaderNav({ menuActive, windowWidth, setMenuActive }) {
  const pathname = usePathname();
  const { role } = useAuth();
  const menuDisplay =
    windowWidth <= 900 && menuActive === true
      ? "block"
      : windowWidth > 900
      ? "flex"
      : "hidden";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = () => {
    if (windowWidth <= 900) {
      setMenuActive(false);
    }
  };

  return (
    <div
      className={`${
        menuDisplay !== "flex"
          ? `${menuDisplay} fixed left-0 top-0 w-full h-fit bg-primary transition-[height] py-14`
          : `flex justify-between items-center space-x-2 w-[75%] h-full px-[2em] ${
              isScrolled
                ? "bg-gradient-to-br from-[#0c1f47] to-[#161132]"
                : "bg-gradient-to-r from-[#ffffff55] to-[#FFFFFF1A]"
            } rounded-bl-[2.5em] rounded-br-[2.5em] transition-colors duration-300`
      }`}
    >
      <nav
        className={`${
          menuDisplay === "block" ? "block" : `flex space-x-[1em] text-base`
        }`}
      >
        <Link
          href="./"
          className={`${
            pathname === "/"
              ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
              : ""
          } text-white hover:text-gray-300 w-[6rem] mx-auto text-center my-2 py-2 rounded-3xl block`}
          onClick={handleLinkClick}
        >
          Home
        </Link>

        {role === "Admin" && (
          <Link
            href="./Dashboard"
            className={`${
              pathname === "/Dashboard"
                ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
                : ""
            } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2 py-2 rounded-3xl block`}
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
        )}

        <Link
          href="/Descover"
          className={`${
            pathname === "/Descover"
              ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
              : ""
          } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2 py-2 rounded-3xl block`}
          onClick={handleLinkClick}
        >
          Discover
        </Link>

        <Link
          href="./Profile"
          className={`${
            pathname === "/Profile"
              ? "bg-gradient-to-r from-[#2573F980] to-[#050C4533] border-[1px] border-gray-300"
              : ""
          } text-white hover:text-gray-300 text-center w-[6rem] mx-auto my-2 py-2 rounded-3xl block`}
          onClick={handleLinkClick}
        >
          Profile
        </Link>
      </nav>

      <div
        className={`${
          menuDisplay === "block"
            ? "flex flex-col space-y-[0.5rem]"
            : "flex items-center space-x-[1em]"
        }`}
      >
        <AuthContextButtonSignOut menuDisplay={menuDisplay} />
        <AuthButton menuDisplay={menuDisplay} />
      </div>
    </div>
  );
}

export default HeaderNav;
