'use client';
import React, { useEffect, useRef, useState } from 'react';
import TripCard from './TripCard';
import { getAllTrips } from '../servicesApi/GetAllTripsApi'; // ⬅️ استيراد API
import Spinner from './Spinner';

function VipTripsRow() {
  const Ref = useRef(null);
  const [trips, setTrips] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const data = await getAllTrips();
        setTrips(data.filter(trip => trip.types === 'vip'));
      } catch (err) {
        setError('Failed to fetch trips.');
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - Ref.current.offsetLeft);
    setScrollLeft(Ref.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsMouseDown(false);
  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - Ref.current.offsetLeft;
    const walk = x - startX;
    Ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div>
      <div className="text-white text-2xl font-bold mt-5 font-sans">
        Special and more enjoyable <b className="text-secondry">Journey</b>
      </div>

      <div className="text-white text-2xl font-semibold flex justify-center mt-10">
        <b className="text-secondry px-2">VIP</b> Journey
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center mt-5">{error}</p>
      ) : (
        <div
          ref={Ref}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="mt-5 flex justify-start items-center overflow-x-auto overflow-y-hidden"
        >
          {trips.length > 0 ? (
            trips.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                title={trip.title}
                price={trip.price}
                duration={trip.duration}
                main_Image={trip.main_image}
                location={trip.location}
              />
            ))
          ) : (
            <p className="text-gray-400">No VIP trips available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default VipTripsRow;
