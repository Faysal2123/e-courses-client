import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';
import { useForm } from 'react-hook-form';
import { data } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CreateStudySession = () => {
    const {user}=useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const {register,handleSubmit,formState:{errors},reset}=useForm()

    const onSubmit=async(data)=>{
      const sessionData={
          title:data.title,
        description:data.description,
        tutor_name: user?.displayName,
      tutor_email: user?.email,
      registration_start_date: data.registrationStartDate,
      registration_end_date: data.registrationEndDate,
      class_start_date: data.classStartDate,
      class_end_date: data.classEndDate,
      session_duration: data.sessionDuration,
      registration_fee: 0, // Default 0, only admin can change
      status: "pending",  // Default status
      average_rating: data.averageRating || 4.7, 
      image: data.sessionImage, 
      reviews: data.reviews || [], 
      google_drive_link: data.googleDriveLink || "",  
      };
      try{
        const response=await axiosPublic.post("course",sessionData)
        toast.success("Study Session Created:",response.data)
        reset()
    
      }
      catch(error){
        console.error("Error creating study session",error)
        toast.error("Failed to create study session. please try again")
      }
    }

    return (
          <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create a Study Session
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Session Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Session Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Session Title is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              placeholder="Enter session title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Tutor Name (Read-Only) */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tutor Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Tutor Email (Read-Only) */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Tutor Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Registration Fee (Read-Only) */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Registration Fee (Admin Only)
            </label>
            <input
              type="number"
              value={0}
              readOnly
              className="w-full border border-gray-300 rounded-md p-3 bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Session Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Session Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              rows="4"
              placeholder="Enter session description"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Session Image (URL or File)
            </label>
            <input
              type="text"
              {...register("sessionImage", { required: "Session image is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
            />
            {errors.sessionImage && <p className="text-red-500 text-sm mt-1">{errors.sessionImage.message}</p>}
          </div>

          {/* Registration & Class Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">Registration Start Date</label>
              <input
                type="date"
                {...register("registrationStartDate", { required: "Start Date is required" })}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-2">Registration End Date</label>
              <input
                type="date"
                {...register("registrationEndDate", { required: "End Date is required" })}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              />
            </div>
            {/* Class Start Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Class Start Date</label>
              <input
                type="date"
                {...register("classStartDate", { required: "Class Start Date is required" })}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              />
            </div>
            {/* Class End Date */}
            <div>
              <label className="block font-medium text-gray-700 mb-2">Class End Date</label>
              <input
                type="date"
                {...register("classEndDate", { required: "Class End Date is required" })}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              />
            </div>
          </div>

          {/* Session Duration */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Session Duration</label>
            <input
              type="text"
              {...register("sessionDuration", { required: "Duration is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              placeholder="Enter session duration (e.g., 4 weeks)"
            />
          </div>

          {/* Max Participants */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Max Participants</label>
            <input
              type="number"
              {...register("maxParticipants", { required: "Max Participants is required" })}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-blue-500"
              placeholder="Enter max participants"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Study Session
          </button>
        </form>
      </div>
      <Toaster />
    </div>
    );
};

export default CreateStudySession;