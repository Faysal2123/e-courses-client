import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const ViewAllCreateSession = () => {
      const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const fetchMaterials = () => {
    if (!user?.email) return;
    setLoading(true);
    axiosPublic.get(`/course/${user.email}`).then((res) => {
      setMaterials(res.data);
    });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/materials/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          fetchMaterials();
        });
      }
    });
  };
  useEffect(() => {
    fetchMaterials();
  }, [user]);
    return (
        <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        View All Materials
      </h1>

      {materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <div key={material._id} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{material.title}</h2>
              <p className="text-sm text-gray-500">
                Session ID: {material.studySessionId}
              </p>
              <p className="text-sm text-gray-500">
                Tutor: {material.tutorEmail}
              </p>
              <img
                src={material.imageUrl}
                alt={material.title}
                className="w-full h-40 object-cover mt-2 rounded-md"
              />
              <a
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                View Material
              </a>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDelete(material._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                <Link
                   to={`/dashboard/updateMaterials/${material._id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                 Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No materials found.</p>
      )}
    </div>
    );
};

export default ViewAllCreateSession;