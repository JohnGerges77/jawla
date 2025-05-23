'use client'
import { useEffect, useState } from 'react';
import { getUserTrips } from '../servicesApi/HistoryApi';
import TripCard from "../_components/TripCard";
import CustomServiceCard from "../_components/CustomServiceCard";
import Spinner from '../_components/Spinner';

function Page() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getUserTrips();
        const tripArray = Array.isArray(data) ? data : [data];
    
        const uniqueTrips = Array.from(
          new Map(tripArray.map(item => [`${item.id}-${item.type}`, item])).values()
        );
        setTrips(uniqueTrips);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  // Function to update trip state after price change
  const handleUpdateTrip = (updatedTrip) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === updatedTrip.id && trip.type === updatedTrip.type
          ? { ...trip, price: updatedTrip.price, state: updatedTrip.state }
          : trip
      )
    );
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  const tripItems = trips.filter(trip => trip.type === "Trip");
  const customServices = trips.filter(trip => trip.type !== "Trip");

  return (
    <div className="p-2 sm:p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Trips History</h1>

      {tripItems.length === 0 ? (
        <div className="flex justify-center items-center text-gray-400 text-3xl mt-10">
          <p>No trips found.</p>
        </div>
      ) : (
        <div className="mt-5 flex justify-center items-center overflow-x-auto overflow-y-hidden flex-wrap">
          {tripItems.map((trip, index) => (
            <div key={`${trip.id}-${trip.type}-${index}`} className="mr-4">
              <TripCard
                {...trip}
                main_Image={trip.images?.main_image || ''}
                history
              />
            </div>
          ))}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 mt-8 text-white">Custom Services</h1>

      {customServices.length === 0 ? (
        <div className="flex justify-center items-center text-gray-400 text-3xl mt-10">
          <p>No custom services found.</p>
        </div>
      ) : (
        <div className="mt-5 flex flex-wrap justify-center gap-4 max-w-[100%] mx-auto">
          {customServices.map((service, index) => (
            <CustomServiceCard
              key={`${service.id}-${service.type}-${index}`}
              {...service}
              onUpdate={handleUpdateTrip} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;