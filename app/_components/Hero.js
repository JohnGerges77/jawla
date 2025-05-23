"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

function Hero() {
  const { isLoading, setIsLoading } = useLoading();
  const [loadedImages, setLoadedImages] = useState(0);
  const totalImages = 1; 

 
  function handleImageLoaded() {
    setLoadedImages((prev) => prev + 1);
  }

 
  useEffect(() => {
    if (loadedImages >= totalImages) {
      setIsLoading(false);
    }
  }, [loadedImages, setIsLoading]);

  return (
    <div className="">
      {isLoading && (
        <div className="absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-100 flex justify-center items-center">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div className="relative h-[75vh] sm:h-screen w-full">
        <Image
          src="/hero.jpg"
          alt="Hero"
          fill
          quality={100}
          className="opacity-80"
          onLoad={handleImageLoaded}
        />
      </div>
      <div className="absolute right-[8%] top-[30%] ">
        <Image width={350} height={190} src="/Frame 19.png" alt="logo" className="w-[180px] md:w-[250px] lg:w-[350px]" />
      </div>
    </div>
  );
}

export default Hero;