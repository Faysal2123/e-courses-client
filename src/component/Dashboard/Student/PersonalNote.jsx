import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const PersonalNote = () => {
     const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!loading && user) {
      const fetchNotes = async () => {
        try {
          const response = await axiosPublic.get(`/note/${user.email}`);
          setNotes(response.data);
        } catch (error) {
          console.error("Failed to fetch notes:", error);
        }
      };
      fetchNotes();
    }
  }, [axiosPublic, user, loading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/note/${id}`);
          setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
          Swal.fire("Deleted!", "Your note has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete the note.", "error");
        }
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your notes.</div>;
  }
    return (
        <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">My Personal Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{note.title}</h2>
            <p className="text-gray-600 mb-4">{note.description}</p>

            <div className="flex justify-between">
              <button
                onClick={() => handleDelete(note._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <Link to={`/dashboard/updateNote/${note._id}`} className="btn bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">Update</Link>
            </div>
          </div>
        ))}
      </div>

      <Toaster />
    </div>
    );
};

export default PersonalNote;