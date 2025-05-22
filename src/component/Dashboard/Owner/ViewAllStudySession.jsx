import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; // ✅ Missing import
import { Link } from 'react-router-dom'; // ✅ Missing import
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../component/Hook/useAxiosPublic';

const MySwal = withReactContent(Swal);

const ViewAllStudySession = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusCounts, setStatusCounts] = useState({ approved: 0, pending: 0, rejected: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axiosPublic.get('/course');
        setSessions(response.data);
        updateStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching study sessions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [axiosPublic]);

  const updateStatusCounts = (data) => {
    const counts = { approved: 0, pending: 0, rejected: 0 };
    data.forEach((session) => {
      counts[session.status] = (counts[session.status] || 0) + 1;
    });
    setStatusCounts(counts);
  };

  const handleApprove = async (sessionId) => {
    try {
      const updatedSession = { status: 'approved' };
      await axiosPublic.patch(`/sessions/status/${sessionId}`, updatedSession);
      const updated = sessions.map((s) =>
        s._id === sessionId ? { ...s, status: 'approved' } : s
      );
      setSessions(updated);
      updateStatusCounts(updated);

      Swal.fire('Approved!', 'The session has been approved.', 'success');
    } catch (error) {
      console.error('Error approving session:', error);
      Swal.fire('Error', 'Failed to approve the session.', 'error');
    }
  };

  const handleReject = async (sessionId) => {
    const { value: formValues } = await MySwal.fire({
      title: 'Reject Session',
      html: `
        <div class="space-y-4 text-left">
          <label class="block text-sm font-medium">Rejection Reason</label>
          <input id="reason" class="swal2-input" placeholder="Enter reason">
          <label class="block text-sm font-medium">Feedback</label>
          <textarea id="feedback" class="swal2-textarea" rows="3" placeholder="Enter feedback"></textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const reason = document.getElementById('reason').value;
        const feedback = document.getElementById('feedback').value;
        if (!reason || !feedback) {
          Swal.showValidationMessage('Please provide both reason and feedback');
        }
        return { reason, feedback };
      },
    });

    if (formValues) {
      try {
        const updatedSession = {
          status: 'rejected',
          rejectionReason: formValues.reason,
          feedback: formValues.feedback,
        };
        const response = await axiosPublic.patch(`/sessions/status/${sessionId}`, updatedSession);
        const updated = sessions.map((s) =>
          s._id === sessionId ? { ...s, ...updatedSession } : s
        );
        setSessions(updated);
        updateStatusCounts(updated);
        Swal.fire('Rejected!', 'The session has been rejected.', 'success');
      } catch (error) {
        console.error('Error rejecting session:', error);
        Swal.fire('Error', 'Failed to reject the session.', 'error');
      }
    }
  };

  const handleDelete = async (sessionId) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this session!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/course/delete/${sessionId}`);
        const updated = sessions.filter((s) => s._id !== sessionId);
        setSessions(updated);
        updateStatusCounts(updated);
        Swal.fire('Deleted!', 'Session has been deleted.', 'success');
      } catch (error) {
        Swal.fire('Error', 'Failed to delete session.', 'error');
      }
    }
  };

  // Pagination
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
  const totalPages = Math.ceil(sessions.length / sessionsPerPage);

  const paginate = (page) => setCurrentPage(page);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">All Study Sessions</h1>

      {loading ? (
        <p className="text-center">Loading sessions...</p>
      ) : (
        <>
          {/* Status Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded text-center">
              <h2 className="font-bold text-green-600">Approved</h2>
              <p className="text-2xl">{statusCounts.approved}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded text-center">
              <h2 className="font-bold text-yellow-600">Pending</h2>
              <p className="text-2xl">{statusCounts.pending}</p>
            </div>
            <div className="bg-red-100 p-4 rounded text-center">
              <h2 className="font-bold text-red-600">Rejected</h2>
              <p className="text-2xl">{statusCounts.rejected}</p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table w-full text-sm">
              <thead className="bg-gray-100">
                <tr className="text-center">
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Tutor</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSessions.map((session, idx) => (
                  <tr key={session._id} className="text-center">
                    <td>{indexOfFirstSession + idx + 1}</td>
                    <td>
                      <img src={session.image} alt="" className="h-14 w-14 mx-auto rounded" />
                    </td>
                    <td>{session.title}</td>
                    <td>{session.description}</td>
                    <td>{session.tutor_name}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${session.status === "approved" ? "bg-green-200 text-green-700" : session.status === "pending" ? "bg-yellow-200 text-yellow-700" : "bg-red-200 text-red-700"}`}>
                        {session.status}
                      </span>
                    </td>
                    <td className="space-x-1">
                      {session.status === "pending" ? (
                        <>
                          <button onClick={() => handleApprove(session._id)} className="btn btn-success btn-sm">Approve</button>
                          <button onClick={() => handleReject(session._id)} className="btn btn-warning btn-sm">Reject</button>
                        </>
                      ) : (
                        <>
                          {session.status !== "rejected" && (
                            <Link to={`/dashboard/details/${session._id}`} className="btn btn-info btn-sm">Update</Link>
                          )}
                          <button onClick={() => handleDelete(session._id)} className="btn btn-error btn-sm">Delete</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-1">
            <button
              className="btn btn-outline"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn btn-outline"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAllStudySession;
