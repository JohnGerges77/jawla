"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeaderNav from "./HeaderNav";

function Header() {
  const pathname = usePathname();

  const [windowWidth, setWindowWidth] = useState(0);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isHome = pathname === "/";

  if (pathname.startsWith("/Dashboard")) return null;

  const largeStyles = `
  text-white py-[1em] box-border
  flex items-center justify-between 
  h-[8em] pt-[3em] mt-[-3em] bg-none z-50
  ${isHome ? "absolute" : ""}
`;

  const smallStyles = `
  text-white flex items-center justify-between w-full h-[5em] px-7 
  ${isHome ? "relative" : ""} 
  bg-primary z-50 top-0 left-0 
`;

  return (
    <div className="w-full flex justify-center">
      <header className={windowWidth > 900 ? largeStyles : smallStyles}>
        <Link href="/">
          <Image src="/Logo.png" alt="logo" width={260} height={100} className="mr-28" />
        </Link>
        {windowWidth > 900 ? (
          <HeaderNav menuActive={menuActive} windowWidth={windowWidth} />
        ) : (
          <>
            <Image
              src="/images/menu.png"
              alt="menu"
              width={30}
              height={30}
              className="z-50"
              onClick={() => setMenuActive((e) => !e)}
            />
            <HeaderNav menuActive={menuActive} windowWidth={windowWidth} />
          </>
        )}
      </header>
    </div>
  );
}

export default Header;
