import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { url } from './uri';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ userId: null, testId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/admindashboard`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching the users', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let atoken = localStorage.getItem('atoken');
    if (atoken === null || atoken === undefined) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleDelete = async () => {
    const { userId, testId } = deleteInfo;
    const atoken = localStorage.getItem("atoken");
    console.log("admin token ", atoken);
    try {
      await axios.delete(`${url}/deleteTestResult`, {
        headers: {
          authorization: atoken
        },
        data: { id: testId }
      });
      setUsers(prevUsers =>
        prevUsers.map(user => {
          if (user._id === userId) {
            return {
              ...user,
              userinfo: user.userinfo.filter(info => info._id !== testId)
            };
          }
          return user;
        })
      );
    } catch (error) {
      console.error('Error deleting the test result', error);
    }
    setShowConfirm(false);
    setDeleteInfo({ userId: null, testId: null });
  };

  const handleDeleteClick = (userId, testId) => {
    setDeleteInfo({ userId, testId });
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteInfo({ userId: null, testId: null });
  };

  const logoutfun = () => {
    localStorage.removeItem('atoken');
    navigate('/admin');
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex w-full justify-between'>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className='flex justify-between w-64'>
          <button className='border px-4 mb-1 bg-blue-500 text-white rounded'>
            <Link to='/addquestion'>ADD QUESTIONS</Link>
          </button>

          <button className='border px-4 mb-1 bg-green-500 text-white font-bold rounded ' onClick={logoutfun}>Logout</button>
        </div>
      </div>

      {loading ? (
        <div className="border border-blue-300 shadow rounded-md mt-[20%] p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div>Loading...</div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Mobile No</th>
                <th className="w-1/5 py-2">Percentage</th>
                <th className="w-1/5 py-2">Test Taken At</th>
                <th className="w-1/5 py-2 px-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                user.userinfo.map((info) => (
                  <tr key={info._id}>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.mobileno}</td>
                    <td className="border px-4 py-2">{info.percentage}</td>
                    <td className="border px-4 py-2">{new Date(info.testTakenAT).toLocaleString()}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteClick(user._id, info._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-xl mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
