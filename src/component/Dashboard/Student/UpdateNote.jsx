import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../component/Hook/useAxiosPublic";

const UpdateNote = () => {
  const [note, setNotes] = useState({ title: "", description: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPublic.put(`/note/${id}`, note);
      toast.success("Note updated successfully");
      setTimeout(() => {
        navigate("/dashboard/manageNotes");
      }, 1000);
    } catch (error) {
      console.error("Failed to update note:", error);
      toast.error("Failed to update note.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotes((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Update Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Note
        </button>
      </form>
      <Toaster></Toaster>
    </div>
  );
};

export default UpdateNote;
