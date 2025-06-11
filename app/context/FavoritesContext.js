'use client'
import { createContext, useContext, useEffect, useState } from "react";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../servicesApi/FavoritesApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setFavoriteTrips([]);
        setLoading(false);
        return;
      }
      const response = await getFavorites();
      setFavoriteTrips(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to get favorites", error);
      setFavoriteTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addFavorite = async (tripId) => {
    try {
      await addToFavorites(tripId);
      setFavoriteTrips((prev) => [...prev, { id: tripId }]);
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error("Failed to add to favorites", error);
    }
  };

  const removeFavorite = async (tripId) => {
    try {
      await removeFromFavorites(tripId);
      setFavoriteTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove from favorites", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoriteTrips, loading, addFavorite, removeFavorite, fetchFavorites }}
    >
  
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}