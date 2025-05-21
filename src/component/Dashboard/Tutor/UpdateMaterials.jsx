import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';

const UpdateMaterials = () => {
   const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  // Fetch Material
  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/materials/${id}`)
      .then((res) => {
        setMaterial(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch material:", err);
        setLoading(false);
      });
  }, [axiosPublic, id]);

  // Handle Update
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedMaterial = {
      title: e.target.title.value,
      link: e.target.link.value,
      imageUrl: e.target.imageUrl.value,
    };

    axiosPublic
      .patch(`/materials/${id}`, updatedMaterial)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Material updated successfully.",
          icon: "success",
        });
        navigate('/dashboard/studyMaterials')
      })
      .catch((err) => {
        console.error("Failed to update material:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to update the material.",
          icon: "error",
        });
      });
  };

  if (loading) {
    return <p className="text-center text-blue-600">Loading...</p>;
  }
    return (
        <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Update Material
      </h1>
      {material ? (
        <form onSubmit={handleUpdate} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={material.title}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Link
            </label>
            <input
              type="url"
              name="link"
              defaultValue={material.link}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              defaultValue={material.imageUrl}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Material
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">Material not found.</p>
      )}
    </div>
    );
};

export default UpdateMaterials;