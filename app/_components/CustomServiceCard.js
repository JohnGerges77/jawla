import React, { useState } from 'react';
import { updateSpecialServiceState } from '../servicesApi/SPecialServices'; // تأكد من استيراد الـ API

function CustomServiceCard({ type, id, startDate, endDate, price, state, onUpdate, ...props }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(price || '');
  const [error, setError] = useState(null);

  // Determine status background color
  const statusBgColor =
    state === 'Accepted' ? 'bg-green-500' :
    state === 'Rejected' ? 'bg-red-500' :
    state === 'Pending' ? 'bg-yellow-500' : 'bg-gray-500';

  // Determine price display based on state
  const priceDisplay =
    state === 'Rejected' ? 'Rejected' :
    state === 'Pending' ? 'Waiting' :
    price ? `$${price}` : 'Free';

  // Handle price update
  const handlePriceUpdate = async () => {
    try {
      await updateSpecialServiceState(type, id, 'Pending', newPrice);
      setIsEditing(false);
      setError(null);
      if (onUpdate) {
        onUpdate({ type, id, price: newPrice, state: 'Pending' });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[150px] min-w-[300px] bg-gradient-to-br from-[#0c1f47] to-[#161132]
     text-white p-3 rounded-2xl shadow-2xl shadow-black/60 m-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{type}</h3>
        {state && (
          <span className={`text-xs font-semibold px-2 py-1 rounded ${statusBgColor}`}>
            {state}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm"><strong>ID:</strong> {id}</p>
        <p className="text-sm"><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
        {endDate && <p className="text-sm"><strong>End Date:</strong> {new Date(endDate).toLocaleDateString()}</p>}
        <div className="text-sm">
          <strong>Price:</strong>{' '}
          {isEditing && state === 'Accepted' ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-20 p-1 rounded text-black"
                placeholder="Enter new price"
              />
              <button
                onClick={handlePriceUpdate}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition duration-300"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              {priceDisplay}
              {state === 'Accepted' && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit Price
                </button>
              )}
            </>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {type === "Car" && (
          <>
            <p className="text-sm"><strong>Car Type:</strong> {props.carType}</p>
            <p className="text-sm"><strong>Start Location:</strong> {props.receivePlace}</p>
            <p className="text-sm"><strong>End Location:</strong> {props.returnPlace}</p>
          </>
        )}
        {type === "Special Trip" && (
          <>
            <p className="text-sm"><strong>Number of Persons:</strong> {props.numberOfPersons}</p>
            <p className="text-sm"><strong>Guide:</strong> {props.addGuide ? 'Yes' : 'No'}</p>
            <p className="text-sm"><strong>Language:</strong> {props.language}</p>
            <p className="text-sm"><strong>Description:</strong> {props.description}</p>
          </>
        )}
        {type === "Tour Guide" && (
          <>
            <p className="text-sm"><strong>Language:</strong> {props.language}</p>
            <p className="text-sm"><strong>Start Place:</strong> {props.startPlace}</p>
            <p className="text-sm"><strong>End Place:</strong> {props.endPlace}</p>
            <p className="text-sm"><strong>Destinations:</strong> {props.destinations}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CustomServiceCard;