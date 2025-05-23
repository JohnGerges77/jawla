import React from "react";
import Image from "next/image"; // ✅ استيراد Image من Next.js
import TapsList from "./TapsList";
import Link from "next/link";
function SideBar() {
 
  return (
    <div
      className="h-full w-[22%] xl:w-[18%] px-[2em] py-[2em] border-r-[1px] border-[#6e6e6e] 
      bg-gradient-to-br from-[#052563] to-[#0b0b0b] fixed"
    >
<Link href='/'>
      <Image
        src="/images/Logo2.png"
        alt="logo"
        width={120} 
        height={48} 
        priority 
        />
        </Link>

      <div className="h-[1px] bg-gray-500 mt-5"></div>

      <TapsList />

    </div>
  );
}

export default SideBar;
