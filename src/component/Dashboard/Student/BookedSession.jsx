import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';


const BookedSession = () => {
    const{user}=useContext(AuthContext)
    const [sessions,setSession]=useState([])
    const [isLoading,setIsLoading]=useState(true)
     useEffect(()=>{
       if(user?.email){
         fetch(`http://localhost:5000/bookedSession/${user?.email}`)
         .then(res=>res.json())
        .then(data=>{
            setSession(data)
            setIsLoading(false)
        })
        .catch((err)=>{
            console.error('Error fetching booked sessions:', err);
            setIsLoading(false);
        })
       }
     })
     if(isLoading){
        return <p className="text-center text-gray-500">Loading booked sessions...</p>
     }
     if(sessions.length === 0){
        return <p className="text-center text-gray-500">No booked sessions found.</p>
     }
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Booked Sessions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {sessions.map((session) => (
                    <div
                        key={session._id}
                        className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold mb-2">{session.sessionTitle}</h2>
                        <p className="text-gray-700 mb-2">{session.sessionDescription}</p>
                        <p className="text-sm text-gray-500">
                            <strong>Registration Fee:</strong>{' '}
                            {session.isFree ? 'Free' : `$${session.registrationFee}`}
                        </p>
                        <p className="text-sm text-gray-500">
                            <strong>Tutor:</strong> {session.tutorEmail}
                        </p>
                        <p className="text-sm text-gray-500 pb-3">
                            <strong>Created At:</strong>{' '}
                            {new Date(session.createdAt).toLocaleString()}
                        </p>
                        <Link
                            to={`/dashboard/studentSessionDetails/${session._id}`}
                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookedSession;