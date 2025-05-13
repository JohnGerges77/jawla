import React from "react";
import { MdCancel } from "react-icons/md";
const CarFormModal = ({
  showForm,
  handleSubmit,
  handleInputChange,
  newCar,
  setShowForm,
  editingCar,
}) => {
  if (!showForm) return null;

  return (
    <div onClick={() => setShowForm(false)} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-md z-50">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative mb-6 p-4 border w-[50%] min-h-[60%] border-gray-800 rounded-xl bg-gradient-to-br from-[#052563] to-[#0f0f10] text-white shadow-lg"
      >

        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 "
        >
        <MdCancel size={28} />
        </button>

        <h2 className="text-2xl font-semibold my-3 text-secondry text-center">
          {editingCar ? "Edit Car" : "Add New Car"}
        </h2>
        
        <div className="flex flex-col space-y-10 items-center">
          <select
            name="state"
            value={newCar.state}
            onChange={handleInputChange}
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          >
            <option value="">Select State</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <input
            type="number"
            name="capacity"
            value={newCar.capacity}
            onChange={handleInputChange}
            placeholder="Capacity"
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          />
          <input
            type="text"
            name="license"
            value={newCar.license}
            onChange={handleInputChange}
            placeholder="License"
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-secondry w-[50%] py-3 px-5 rounded-[50px] font-bold text-xl text-black"
          >
            {editingCar ? "Update Car" : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFormModal;