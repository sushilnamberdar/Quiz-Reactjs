import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [results, setResults] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserEmail, setEditUserEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching the results', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      setResults(results.filter(result => result.id._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEdit = (userId, userEmail) => {
    setEditUserId(userId);
    setEditUserEmail(userEmail);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`/api/admin/user/${editUserId}`, { email: editUserEmail });
      setResults(results.map(result => result.id._id === editUserId ? { ...result, id: response.data } : result));
      setEditUserId(null);
      setEditUserEmail('');
    } catch (error) {
      console.error('Error editing user', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2">Email</th>
              <th className="w-1/4 py-2">Mobile No</th>
              <th className="w-1/4 py-2">Percentage</th>
              <th className="w-1/4 py-2">Test Taken At</th>
              <th className="w-1/4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => (
              <tr key={result._id} className="text-center border-t">
                <td className="py-2">
                  {editUserId === result.id._id ? (
                    <input 
                      type="email" 
                      value={editUserEmail} 
                      onChange={(e) => setEditUserEmail(e.target.value)}
                      className="border p-1"
                    />
                  ) : (
                    result.id.email
                  )}
                </td>
                <td className="py-2">{result.id.mobileno}</td>
                <td className="py-2">{result.percentage}</td>
                <td className="py-2">{new Date(result.testTakenAT).toLocaleString()}</td>
                <td className="py-2">
                  {editUserId === result.id._id ? (
                    <button onClick={handleSaveEdit} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(result.id._id, result.id.email)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                  )}
                  <button onClick={() => handleDelete(result.id._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
