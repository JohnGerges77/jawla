"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Hero() {
  const { isLoading, setIsLoading } = useLoading();
  const [loadedImages, setLoadedImages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = ["/hero.jpg", "/hero2.jpg", "/hero3.jpg","/hero4.jpg"];
  const totalImages = images.length;

  function handleImageLoaded() {
    setLoadedImages((prev) => prev + 1);
  }

  useEffect(() => {
    if (loadedImages >= totalImages) {
      setIsLoading(false);
    }
  }, [loadedImages, setIsLoading]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 5000);
    return () => clearInterval(interval); 
  }, [totalImages]);

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us-section");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToTrips = () => {
    const TripsSection = document.getElementById("trips-section");
    if (TripsSection) {
      TripsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-100 flex justify-center items-center">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div className="relative h-[75vh] sm:h-screen w-full overflow-hidden">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Hero ${index + 1}`}
            fill
            quality={100}
            className={`transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-80" : "opacity-0"
            } object-cover`}
            onLoad={handleImageLoaded}
          />
        ))}

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-secondry rounded-full p-2 hover:bg-white transition duration-500"
        >
          <AiOutlineLeft size={32} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-secondry rounded-full p-2 hover:bg-white transition duration-500"
        >
          <AiOutlineRight size={32} />
        </button>
      </div>

      <div className="absolute left-[8%] top-[25%] z-10 hidden md:block">
        <Image
          width={350}
          height={190}
          src="/Frame 19.png"
          alt="logo"
          className="w-[180px] md:w-[250px] lg:w-[350px]"
        />
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToTrips}
            className="bg-secondry text-primary hover:bg-gray-300 w-[55%] py-3 px-5 rounded-[50px] font-semibold text-l mt-4 transition duration-500"
          >
            Explore Our Trips
          </button>
          <button
            onClick={scrollToAboutUs}
            className="bg-primary text-gray-100  w-[45%] py-3 px-5 rounded-[50px] font-semibold text-l mt-4 transition duration-500"
          >
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
