"use client";
import React, { useState, useEffect } from "react";
import {
  getTourGuides,
  addTourGuide,
  deleteTourGuide,
  updateTourGuide,
} from "../DashboardApis/TourGuideApi";
import TourGuideFormModal from "../_DashboardComponents/TourGuideForm";
import TourGuideTable from "../_DashboardComponents/TourGuideTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "@/app/_components/Spinner";

function TourGuidesPage() {
  const [tourGuides, setTourGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newTourGuide, setNewTourGuide] = useState({
    name: "",
    language: "",
    phone: "",
    state: "",
  });
  const [editingTourGuide, setEditingTourGuide] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTourGuides();
        if (data && data.length > 0) {
          setTourGuides(data);
        }
      } catch (err) {
        toast.error("Failed to fetch tour guides.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setNewTourGuide({
    ...newTourGuide,
    [name]: name === "phone" ? value.replace(/\D/g, "") : value, 
  });
};


 const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!newTourGuide.name || !newTourGuide.language || !newTourGuide.phone || !newTourGuide.state) {
    toast.warn("Please fill in all fields.");
    return;
  }
  const tourGuideData = {
    ...newTourGuide,
   
  };
  if (editingTourGuide) {
    try {
      const updatedTourGuide = await updateTourGuide(editingTourGuide.id, {
        ...tourGuideData,
        id: editingTourGuide.id, 
      });
  
      if (updatedTourGuide !== null) {
        toast.success("Tour Guide updated successfully!");
        setTourGuides((prevGuides) =>
          prevGuides.map((guide) =>
            guide.id === editingTourGuide.id ? { ...guide, ...tourGuideData } : guide
          )
        );
      } else {
        toast.error("Failed to update Tour Guide.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update request failed.");
    }
    setEditingTourGuide(null);
  
  } else {
    const addedTourGuide = await addTourGuide(newTourGuide);
    if (addedTourGuide) {
      toast.success("Tour guide added successfully!");
      setTourGuides((prev) => [...prev, addedTourGuide]);
    } else {
      toast.error("Failed to add tour guide.");
    }
  }

  setNewTourGuide({ name: "", language: "", phone: "",state: "" });
  setShowForm(false);
};

  const handleDelete = async (tourGuideId) => {
    const isDeleted = await deleteTourGuide(tourGuideId);
    if (isDeleted) {
      setTourGuides((prev) => prev.filter((guide) => guide.id !== tourGuideId));
      toast.success("Tour guide deleted successfully!");
    } else {
      toast.error("Failed to delete tour guide.");
    }
  };

  const handleEdit = (guide) => {
  
    setNewTourGuide({
      name: guide.name,
      language: guide.language,
      phone: guide.phone.toString(),
      state:guide.state
    });
    setEditingTourGuide(guide);
    setShowForm(true);
  };

  if (loading) return <div>
    
    <Spinner />;
  </div>

  return (
    <div className="py-2 px-5">
      <TourGuideFormModal
        showForm={showForm}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        newTourGuide={newTourGuide}
        setShowForm={setShowForm}
        editingTourGuide={editingTourGuide}
      />

      <TourGuideTable
        tourGuides={tourGuides}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingTourGuide(null);
          setNewTourGuide({ name: "",  language: "" ,phone: "",state:"" });
        }}
        className="bg-blue-700 text-white px-4 py-3 rounded-lg mt-4 hover:bg-blue-600 duration-500 transition-all"
      >
        Add New Tour Guide
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default TourGuidesPage;
