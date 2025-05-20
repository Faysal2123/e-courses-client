import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../component/Hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateNote = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    const noteData = {
      title,
      description,
      email: user.email,
    };
    try {
      await axiosPublic.post("/note", noteData);
      setTimeout(()=>{

        navigate("/manageNotes");
      },1000)
      toast.success("Note created successfully");
      setTitle(""); // Reset input
      setDescription(""); // Reset input
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Create a Note
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-lg text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            readOnly
            className="border-2 border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-md text-lg hover:bg-blue-600 transition duration-300"
          >
            Create Note
          </button>
        </div>
      </form>
      <Toaster></Toaster>
    </div>
  );
};

export default CreateNote;
