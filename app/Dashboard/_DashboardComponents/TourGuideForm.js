import React from "react";
import { MdCancel } from "react-icons/md";

const TourGuideFormModal = ({
  showForm,
  handleSubmit,
  handleInputChange,
  newTourGuide,
  setShowForm,
  editingTourGuide,
}) => {
  if (!showForm) return null;

  return (
    <div
      onClick={() => setShowForm(false)}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-md z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative mb-6 p-4 border w-[50%] min-h-[60%] border-gray-800 rounded-xl bg-gradient-to-br from-[#052563] to-[#0f0f10] text-white shadow-lg"
      >
        {/* زر الإغلاق */}
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 "
        >
          <MdCancel size={28} />
        </button>

        <h2 className="text-2xl font-semibold my-3 text-secondry text-center">
          {editingTourGuide ? "Edit Tour Guide" : "Add New Tour Guide"}
        </h2>

        <div className="flex flex-col space-y-10 items-center">
        <select
            name="state"
            value={newTourGuide.state}
            onChange={handleInputChange}
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          >
            <option value="">Select State</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <input
            type="text"
            name="name"
            value={newTourGuide.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          />
          <input
            type="text"
            name="language"
            value={newTourGuide.language}
            onChange={handleInputChange}
            placeholder="Language"
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          />
           <input
            type="text"
            name="phone"
            value={newTourGuide.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            maxLength={11}
            className="w-[80%] py-4 px-5 bg-primary border rounded-[50px]"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-secondry w-[50%] py-3 px-5 rounded-[50px] font-bold text-xl text-black"
          >
            {editingTourGuide ? "Update Tour Guide" : "Add Tour Guide"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TourGuideFormModal;