import React, { useState } from 'react';
import AddUserForm from '../../components/addUserForm'; // Update this import path
import { useRouter } from 'next/router';

export default function IndexPage() {
  const [formData, setFormData] = useState({});
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBackClick = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col justify-center items-center">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackClick}
            className="absolute top-8 left-8 py-3 px-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            Kembali
          </button>
          <h1 className="text-4xl font-bold text-center text-indigo-700 flex-grow">Add New User</h1>
        </div>
        <AddUserForm formData={formData} setFormData={handleInputChange} />
      
    </div>
  );
}
