"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeaderNav from "./HeaderNav";
import { useLoading } from "../context/LoadingContext";

function Header() {
  const { isLoading } = useLoading();
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
  if (isLoading) return null;

  const largeStyles = `
    text-white py-[1em] box-border
    flex items-center justify-between 
    h-[8em] pt-[3em] mt-[-3em]  z-50
    ${isHome ? "absolute" : "sticky top-0"}
  `;

  const smallStyles = `
    text-white flex items-center justify-between w-full h-[5em] px-7 
    ${isHome ? "relative" : "sticky top-0"} 
    bg-primary z-50
  `;

  return (
    <div className="w-full flex justify-center sticky top-0 z-50 ">
      <header className={windowWidth > 900 ? largeStyles : smallStyles}>
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="logo"
            width={260}
            height={100}
            className="mr-28"
          />
        </Link>
        {windowWidth > 900 ? (
          <HeaderNav
            menuActive={menuActive}
            windowWidth={windowWidth}
            setMenuActive={setMenuActive}
          />
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
            <HeaderNav
              menuActive={menuActive}
              windowWidth={windowWidth}
              setMenuActive={setMenuActive}
            />
          </>
        )}
      </header>
    </div>
  );
}

export default Header;