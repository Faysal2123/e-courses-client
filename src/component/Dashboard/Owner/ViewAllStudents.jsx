import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ViewAllStudents = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  const usersPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users?search=${searchTerm}`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, [searchTerm]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setNewRole("");
  };

  const handleRoleChange = async () => {
    if (!newRole) {
      toast.error("Please select a role.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Role update failed");
      }

      const updatedUser = await res.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );

      toast.success("Role updated successfully!");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role.");
    }
  };

  return (
    <div className="md:container mx-auto md:p-6">
      <Toaster />
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        All Registered Users
      </h1>
      <p className="text-center text-gray-700 mb-8 text-lg">
        Welcome to the User Management section. Here, administrators can view all users registered on the platform.
      </p>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or email"
          className="px-4 py-2 border rounded-md w-1/2"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full table-auto">
          <thead className="bg-blue-100">
            <tr>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">#</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Image & Name</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id} className="border-t hover:bg-blue-50 transition-all">
                <td className="py-3 px-6 text-sm text-gray-600">{indexOfFirstUser + index + 1}</td>
                <td className="py-3 px-6">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.country}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-6 text-sm text-gray-600">{user.role}</td>
                <td className="py-3 px-6 text-sm text-gray-600">{user.email}</td>
                <td className="py-3 px-6 text-sm">
                  <button
                    onClick={() => openModal(user)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-l-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal for Updating Role */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg w-80 md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Update User Role</h3>

            <p className="mb-2 text-sm text-gray-600">
              Current Role: <span className="font-semibold text-blue-600">{selectedUser?.role}</span>
            </p>

            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-semibold text-gray-600">Select New Role</label>
              <select
                id="role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="px-4 py-2 border rounded-md w-full"
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleChange}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-center text-sm text-gray-500">
          Manage users efficiently by updating their roles.
        </p>
      </div>
    </div>
  );
};

export default ViewAllStudents;
