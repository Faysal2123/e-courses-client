import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../Hook/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SessionDetails = () => {
  const details = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  if (!details || Object.keys(details).length === 0) {
    return <div className="text-center mt-10">No session details found.</div>;
  }
  const {
    _id: sessionId,
    title,
    description,
    tutor_name,
    tutor_email,
    registration_start_date,
    registration_end_date,
    class_start_date,
    class_end_date,
    session_duration,
    registration_fee,
    status,
    average_rating,
    image,
    reviews,
    google_drive_link,
  } = details;
  console.log(tutor_email);

  const isRegistrationClosed = new Date() > new Date(registration_end_date);
  const handleBooking = async() => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to book this session.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return navigate("/login");
    }
    const isFree = registration_fee === 0;
    const bookingData = {
      sessionId,
      image,
      title,
      description,
      tutor_name,
      tutor_email,
      registration_start_date,
      registration_end_date,
      class_start_date,
      class_end_date,
      session_duration,
      registration_fee,
      status,
      average_rating,
      reviews,
      link: google_drive_link,
      userEmail: user.email,
      userName: user.displayName,
      sessionTitle: title,
      sessionDescription: description,
      registrationFee: registration_fee,
      isFree,
      createdAt: new Date(),
    };
    // if(!isFree){
    //   navigate(`/payment/${sessionId}`,{state: bookingData});
    // }
    try {
      const res =await axiosPublic.post("/bookings", bookingData);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Booking successful",
          text: "Your booking has been confirmed.",
          icon: "success",
          confirmButtonText: "OK",
        });
        return navigate("/dashboard/viewBooked");
      }
    } catch {
      Swal.fire({
        title: "Booking failed",
        text: "There was an error processing your booking.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="w-11/12 mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full max-w-md mx-auto mb-6 rounded"
          />
        )}

        <p>
          <strong className="text-gray-700">Tutor Name:</strong> {tutor_name}
        </p>
        <p>
          <strong className="text-gray-700">Tutor Email:</strong> {tutor_email}
        </p>
        <p>
          <strong className="text-gray-700">Status:</strong> {status}
        </p>
        <p>
          <strong className="text-gray-700">Average Rating:</strong>{" "}
          {average_rating}
        </p>

        <p className="mt-4 text-gray-800">
          <strong>Description:</strong> {description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <p>
            <strong>Registration Start Date:</strong> {registration_start_date}
          </p>
          <p>
            <strong>Registration End Date:</strong> {registration_end_date}
          </p>
          <p>
            <strong>Class Start Date:</strong> {class_start_date}
          </p>
          <p>
            <strong>Class End Date:</strong> {class_end_date}
          </p>
          <p>
            <strong>Session Duration:</strong> {session_duration}
          </p>
          <p>
            <strong>Registration Fee:</strong>{" "}
            {registration_fee === 0 ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              `${registration_fee} BDT`
            )}
          </p>
        </div>

        {google_drive_link && (
          <div className="mt-4">
            <p>
              <strong>Study Materials:</strong>{" "}
              <a
                href={google_drive_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View on Google Drive
              </a>
            </p>
          </div>
        )}

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Student Reviews:</h2>
          {reviews && reviews.length > 0 ? (
            <ul className="space-y-2 text-gray-700">
              {reviews.map((review, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded">
                  <p>
                    <strong>User:</strong> {review.user}
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p>
                    <strong>Comment:</strong> {review.comment}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          {isRegistrationClosed ? (
            <button
              disabled
              className="bg-gray-400 text-white py-2 px-6 rounded-md cursor-not-allowed"
            >
              Registration Closed
            </button>
          ) : (
            <button
              onClick={handleBooking}
              className="bg-yellow-500 text-white py-2 px-6 rounded-md hover:bg-yellow-600 transition"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
