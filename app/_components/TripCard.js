"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getFavorites } from "../servicesApi/FavoritesApi";
import { useFavorites } from "../context/FavoritesContext";
import { toast } from "react-toastify";
import { FaCalendarDays } from "react-icons/fa6"
function TripCard({
  id,
  title,
  location,
  main_Image,
  type,
  price,
  duration,
  history,
}) {
  const { favoriteTrips, addFavorite, removeFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsFavorite(false);
          setLoading(false);
          return;
        }

        const favorites = await getFavorites();
        setIsFavorite(favorites.some((trip) => trip.id === id));
      } catch (error) {
        console.error("⚠️ Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favoriteTrips, id]);

  const handleFavoriteToggle = async () => {
    if (!id) return console.error("⚠️ Error: Trip does not have an ID!");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add/remove favorites!");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
      } else {
        await addFavorite(id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("⚠️ Error toggling favorite:", error);
    }
  };

  return (
    <div className="mr-4 relative top-14">
      <div
        className="flex justify-end items-center relative right-4 top-8 cursor-pointer"
        onClick={handleFavoriteToggle}
      >
        <Image
          src={isFavorite ? "/fav-filled.png" : "/fav.png"}
          alt="fav-icon"
          width={40}
          height={40}
          className="absolute w-[40px] h-auto"
        />
      </div>

      {type === "vip" && (
        <div className="flex justify-start items-center relative left-4 top-8">
          <Image
            src="/vip.png"
            alt="vip-icon"
            width={40}
            height={40}
            className="absolute w-[40px] h-auto"
          />
        </div>
      )}
      {type === "sale" && (
        <div className="flex justify-start items-center relative left-4 top-6">
          <Image
            src="/sale.png"
            alt="sale-icon"
            width={45}
            height={40}
            className="absolute w-[40px] h-auto"
          />
        </div>
      )}

      <Image
        src={main_Image || "/tripImage.jpg"}
        alt="trip-image"
        width={400}
        height={250}
        className="h-[230px] max-w-[300px] sm:min-w-[320px] sm:min-h-[250px] rounded-xl"
      />

      <div
        className="shadow-[0px_5px_10px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-[#FFFFFF50] to-[#FFFFFF20] 
        backdrop-blur-sm pt-4 pb-2 mx-[10px] sm:w-[300px] w-[275px] relative bottom-32 px-5 rounded-xl"
      >
        <div className="flex justify-between items-center">
          <p>{title || "Unknown Trip"}</p>
          <div className="text-sm flex gap-1">
            <Image
              src="/Vector.png"
              width={18}
              height={18}
              alt="location-icon"
            />
            <span>{location || "Unknown Location"}</span>
          </div>
        </div>

        <div className="bg-white opacity-60 h-[2px] m-1">
          <span></span>
        </div>

        <div className="flex justify-between">
          <div>
            <div className="flex gap-1  items-center">
              <FaCalendarDays />
              <span>{duration} days</span>
            </div>

            <div className="flex gap-1 mt-1">
              <Image
                src="/vector3.png"
                width={18}
                height={18}
                alt="price-icon"
              />
              <span>{price} LE</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!history && (
              <Link
                href={`/Detail?id=${id}`}
                className="bg-primary text-white pt-1 px-2 h-8 rounded-xl"
              >
                Book Now
              </Link>
            )}
            {history && (
              <Link
                href={`/Detail?id=${id}`}
                className="bg-primary text-white pt-1 px-2 h-8 rounded-xl"
              >
               Show Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripCard;