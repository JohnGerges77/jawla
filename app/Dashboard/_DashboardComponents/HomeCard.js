
import { FaUser } from "react-icons/fa"; 
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaTicketAlt } from "react-icons/fa"; 

import { HiOutlineBanknotes } from 'react-icons/hi2'
function HomeCard({ data, title ,time}) {
  return (
    <div>
      <div
        className="min-h-[150px] min-w-[200px] bg-gradient-to-br from-[#0c1f47] to-[#161132]
        text-white p-3 rounded-2xl shadow-2xl shadow-black/60"
      >
        <div className="flex justify-between items-center">
          <p className="text-gray-200 text-xl">{title}</p>
          {title === "Total Users" ? (
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <FaUser className="text-white text-2xl" />
            </div>
          ) : (
            ""
          )}
          {title === "Active Trips" ? (
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <FaMapMarkedAlt className="text-white text-2xl" />
            </div>
          ) : (
            ""
          )}
          {title === "Trips Bookings" ? (
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mr-3">
              <FaTicketAlt className="text-white text-2xl" />
            </div>
          ) : (
            ""
          )}

          {title === "Sales" ? (
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <HiOutlineBanknotes className="text-white text-2xl" />
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center mb-1">
          <h2 className="text-4xl font-semibold text-secondry pl-2">
            {data !== null ? data : "Loading..."}
          </h2>
        </div>
      
          <p className="text-sm text-gray-300">Trending up this month ↗</p>
      
     
        <p className="text-xs text-gray-400">{ time===1?'For Today' : `For the last ${time} days`}</p>
      </div>
    </div>
  );
}

export default HomeCard;
