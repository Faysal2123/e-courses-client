import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../component/Hook/useAxiosPublic";

const UploadMaterials = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    image: null,
  });
  console.log(sessions)

  // Fetch sessions specific to the logged-in user
  useEffect(() => {
    const fetchApprovedSessions = async () => {
      try {
        if (user?.email) {
          const response = await axiosPublic.get(
            `/course/email/${user.email}`
          );
          setSessions(response.data);
        }
      } catch (err) {
        toast.error("Failed to fetch approved sessions.");
      }
    };

    fetchApprovedSessions();
  }, [axiosPublic, user?.email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSession) {
      toast.error("Please select a session first.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);

    try {
      const imgResponse = await axiosPublic.post(
        `https://api.imgbb.com/1/upload?key=fde667bc3406bef9c33157c2d5d24b67`,
        formDataToSend
      );

      const imageUrl = imgResponse.data.data.display_url;

      const materialData = {
        title: formData.title,
        link: formData.link,
        imageUrl,
        studySessionId: selectedSession._id,
        tutorEmail: user.email,
      };

      await axiosPublic.post("/materials", materialData);
      toast.success("Material uploaded successfully!");
      setFormData({ title: "", link: "", image: null });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload material.");
    }
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Upload Materials
      </h1>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <div
              key={session._id}
              className={`p-4 border rounded-lg shadow cursor-pointer ${
                selectedSession?._id === session._id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedSession(session)}
            >
              <h3 className="font-medium text-gray-700">{session.title}</h3>
              <p className="text-sm text-gray-500">ID: {session._id}</p>
              <p className="text-sm text-gray-500">
                Tutor: {session.tutor_name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedSession && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={selectedSession.title}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Study Session ID:</label>
            <input
              type="text"
              value={selectedSession._id}
              readOnly
              className="w-full border p-2 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Tutor Email:</label>
            <input
              type="text"
              value={selectedSession.tutor_email}
              readOnly
              className="w-full border p-2 rounded-md bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium">Image:</label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Google Drive Link:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Upload Material
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadMaterials;
