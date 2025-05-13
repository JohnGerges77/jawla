"use client";
import Image from "next/image";

function Hero() {

  return (
    <div className="">


    <div className="relative h-[75vh] sm:h-screen w-full">
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill
        
      quality={100}
        className=" opacity-80"
      
      />
    </div>
  




      <div className="absolute right-[8%] top-[30%] hidden md:block">
        <Image width={350} height={190} src="/Frame 19.png" alt="logo" />
      </div>
    </div>
  );
}

export default Hero;
