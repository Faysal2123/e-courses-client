import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const ViewMaterial = () => {
    const {user}=useContext(AuthContext)
    const[sessions,setSessions]=useState([])
    const [isLoading,setIsLoading]=useState(true)
    useEffect(()=>{
        if(user?.email){
            fetch(`https://e-courses-server-gamma.vercel.app/booked/${user?.email}`)
            .then(res=>res.json())
            .then(data=>{
                setSessions(data)
                setIsLoading(false)
            })
            .catch((err)=>{
                console.error('Error fetching booked sessions:', err);
                setIsLoading(false);
            })
        }
    })
    return (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sessions.map((session) => (
        <div key={session._id} className="border p-4 rounded-lg shadow-md">
          <img
            src={session.image}
            alt={session.sessionTitle}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">{session.sessionTitle}</h3>
          <p className="text-gray-600">{session.sessionDescription}</p>
          
          <a
            href={session.google_drive_link}
              target="_blank"
                            
            rel="noopener noreferrer"
            className="text-blue-500 mt-2 block"
          >
            Access Materials
          </a>
        </div>
      ))}
    </div>
    );
};

export default ViewMaterial;