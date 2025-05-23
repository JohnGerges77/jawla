"use client";
import { useFavorites } from "../context/FavoritesContext";
import TripCard from "../_components/TripCard";
import { useEffect, useState } from "react";

function FavoritesPage() {
  const { favoriteTrips, loading, fetchFavorites } = useFavorites();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Check for token on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust based on your token storage method
    if (token) {
      setIsAuthenticated(true);
      fetchFavorites(); // Trigger fetch only if authenticated
    }
    setAuthChecked(true);
  }, [fetchFavorites]);

  // If auth check is not complete, show loading state
  if (!authChecked) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is not authenticated, show login prompt
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
        <p>Loading...</p>
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