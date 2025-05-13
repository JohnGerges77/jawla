import React from "react";
import { MdCancel } from "react-icons/md";

const TripFormModal = ({
  showForm,
  handleSubmit,
  handleInputChange,
  newTrip,
  setShowForm,
  editingTrip,
}) => {
  if (!showForm) return null;

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    handleInputChange({
      target: {
        name,
        value: name === "images" ? files : files[0],
      },
    });
  };

  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    handleInputChange({
      target: {
        name,
        value: value ? value.split(",").map((id) => id.trim()) : [],
      },
    });
  };

  return (
    <div
      onClick={() => setShowForm(false)}
className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-40 backdrop-blur-md z-50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="relative mb-6 p-4 border w-[60%] min-h-[60%] border-gray-800 rounded-xl bg-gradient-to-br from-[#052563] to-[#0f0f10] text-white shadow-lg"
      >
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4"
        >
          <MdCancel size={28} />
        </button>

        <h2 className="text-2xl font-semibold my-3 text-secondry text-center">
          {editingTrip ? "Edit Trip" : "Add New Trip"}
        </h2>

        <div className="grid grid-cols-2 gap-6 px-6">
          {editingTrip && (
            <input
              type="text"
              name="id"
              value={newTrip.id || editingTrip.id}
              readOnly
              className="w-full py-3 px-4 bg-primary border rounded-xl"
              placeholder="Trip ID"
              title="Trip ID (read-only)"
            />
          )}

          <input
            type="text"
            name="title"
            value={newTrip.title}
            onChange={handleInputChange}
            placeholder="Trip Title"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="text"
            name="location"
            value={newTrip.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="date"
            name="start_date"
            value={newTrip.start_date}
            onChange={handleInputChange}
            placeholder="Start Date (YYYY-MM-DD)"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="text"
            name="description"
            value={newTrip.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="number"
            name="price"
            value={newTrip.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="number"
            name="duration"
            value={newTrip.duration}
            onChange={handleInputChange}
            placeholder="Duration (days)"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
          <input
            type="number"
            name="persons"
            value={newTrip.persons}
            onChange={handleInputChange}
            placeholder="Number of Persons"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />

          <select
            name="state"
            value={newTrip.state}
            onChange={handleInputChange}
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
        
            name="types"
            value={newTrip.types}
            onChange={handleInputChange}
        
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          >
               <option value="">normal</option>
            <option value="Active">vip</option>

     </select>
          <input
            type="file"
            name="main_image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />

          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />

          {newTrip.images && (
            <ul className="col-span-2">
              {Array.from(newTrip.images).map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            name="carIds"
            value={newTrip.carIds}
            onChange={handleArrayInputChange}
            placeholder="Car IDs (comma-separated)"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />

          <input
            type="text"
            name="tourguideIds"
            value={newTrip.tourguideIds}
            onChange={handleArrayInputChange}
            placeholder="Tour Guide IDs (comma-separated)"
            className="w-full py-3 px-4 bg-primary border rounded-xl"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-6">
          <button
            type="submit"
            className="bg-secondry w-[50%] py-3 px-5 rounded-xl font-bold text-xl text-black"
          >
            {editingTrip ? "Update Trip" : "Add Trip"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripFormModal;