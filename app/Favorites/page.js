"use client";
import { useFavorites } from "../context/FavoritesContext";
import TripCard from "../_components/TripCard";
import { useEffect, useState } from "react";
import Spinner from "../_components/Spinner";

function FavoritesPage() {
  const { favoriteTrips, loading, fetchFavorites } = useFavorites();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setIsAuthenticated(true);
      fetchFavorites(); 
    }
    setAuthChecked(true);
  }, [fetchFavorites]);

  
  if (!authChecked) {
    return (
      <div className="p-8">
      <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4 text-white">Favorite Trips</h1>
        <div className="flex justify-center items-center text-secondary text-3xl mt-[10%]">
          <p>Please log in to view your favorite trips.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Favorite Trips</h1>

      {loading ? (
    <Spinner />
      ) : favoriteTrips.length === 0 ? (
        <div className="flex justify-center items-center text-secondary text-3xl mt-[10%]">
          <p>No favorite trips yet.</p>
        </div>
      ) : (  <div className="mt-5 flex justify-center items-center overflow-x-auto overflow-y-hidden flex-wrap">
          {favoriteTrips.map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;