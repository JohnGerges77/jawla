"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; 

function Tap({ tap }) {
  const pathname = usePathname();
  const isHome = tap.title === "Dashboard"; 
  const isActive = isHome ? pathname === "/Dashboard" : pathname === `/Dashboard/${tap.title}`;

  return (
    <>
    <Link
      href={isHome ? "/Dashboard" : `/Dashboard/${tap.title}`}
      className={`flex items-center w-[100%] py-[0.5em] px-[1.5em] rounded-lg space-x-[1em] cursor-pointer ${
        isActive ? "text-[#1E2D4B] bg-[#F2CD7E]" : "text-[#F2CD7E] "
      }  ${tap.title==='Help'?'relative top-36':''}`}
      >
      
      <Image
        src={isActive ? tap.icon : tap.yellowIcon}
        alt={tap.title}
        width={24}
        height={24} 
        className="h-[1.5em] w-auto"
        />
      <span className="w-[100%] text-[0.9em] font-bold">{tap.title}</span>
    </Link>

 
    
        </>
  );
}

export default Tap;
