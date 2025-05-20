import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';
import Swal from 'sweetalert2';

const ViewAllMaterial = () => {
    const {user}=useContext(AuthContext)
     const [materials, setMaterials] = useState([]);
     const axiosPublic =useAxiosPublic()
     useEffect(()=>{
        const fetchMaterials =async ()=>{
           try{
            const res = await axiosPublic.get(`/material/${user.email}`)
            setMaterials(res.data)
           }
           catch(error){
            console.error("Error fetching materials:", error);
           }
        };
        fetchMaterials();
     },[axiosPublic])
   const handleDelete =async (id)=>{
       Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then(async(result) => {
  if (result.isConfirmed) {
   try{
    await axiosPublic.delete(`/material/${id}`)
    setMaterials(materials.filter((material)=> material._id !== id))
    Swal.fire('Deleted!', 'The material has been deleted.', 'success');
   }
   catch(error){
    console.error("Error deleting material:", error);
     Swal.fire('Error!', 'Failed to delete the material.', 'error');
      
   }
  }
});

   }
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">View All Materials</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {materials.length > 0 ? (
                    materials.map((material) => (
                        <div
                            key={material._id}
                            className="border rounded-lg shadow-md p-4 bg-white"
                        >
                            <img
                                src={material.imageUrl}
                                alt={material.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-lg font-bold mb-2">{material.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Tutor:</strong> {material.tutorEmail}
                            </p>
                            <a
                                href={material.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline mb-4 block"
                            >
                                View Material
                            </a>
                            <button
                                onClick={() => handleDelete(material._id)}
                                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center">
                        No materials found!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ViewAllMaterial;