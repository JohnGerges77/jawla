
'use client'
import { useEffect, useState } from 'react';
import { getUserTrips, deleteUserTrip } from '../servicesApi/HistoryApi'; // استيراد deleteUserTrip
import TripCard from "../_components/TripCard";

function Page() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getUserTrips();
        const tripArray = Array.isArray(data) ? data : [data];
        setTrips(tripArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrips();
  }, []); 

  const handleDelete = async (type, id) => {
    try {
      await deleteUserTrip(type, id);
      // تحديث الحالة بإزالة الرحلة المحذوفة
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <div className="text-red-500">{error}</div>;

  console.log('Trips Data:', trips);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Trips History</h1>

      {trips.length === 0 ? (
        <div className="flex justify-center items-center text-secondry text-3xl mt-[10%]">
          <p>No trips found.</p>
        </div>
      ) : (
        <div className="mt-5 flex justify-start items-center overflow-x-auto overflow-y-hidden">
          {trips.map((trip, index) => (
            <div key={`${trip.id}-${index}`} className="mr-4">
              <TripCard 
                key={`${trip.id}-${index}`} 
                {...trip} 
                main_Image={trip.images?.main_image || ''} 
                onDelete={() => handleDelete('Trip', trip.id)} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
