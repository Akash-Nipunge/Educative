import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import AdminNavigation from './AdminNavigation';
import leave from './adminPng/leave.png';

const StudentRegistration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStudent = ()=>{
    setLoading(true);
    navigate("/admin/student/delete")
    setLoading(false)
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://educative-backend.onrender.com/api/v1/admin/student/register",
        formData
      );
      setLoading(false);
      //console.log("User registered successfully");
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
      });
      //console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error("Error occurred during registration:", error.response.data);
        alert("User registration failed. Error: " + error.response.data);
      } else {
        console.error("Error occurred during registration:", error.message);
        alert("User registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <AdminNavigation />

      <div className='absolute lg:right-20 flex flex-row gap-2 max-w-11 mt-5 mx-auto w-96'>

    <button type="button" onClick={handleStudent} className="btn btn-outline btn-primary shadow-md flex flex-row items-center space-x-2 px-4 py-2">
      <img src={leave} alt="delete student" className='w-6 h-6' />
      <span className=" text-red-700 font-semibold text-sm  ">Delete Student</span>
    </button>
 
</div>

      <div className="registration max-w-96  mt-2 shadow-md p-6 gap-4 mx-auto flex flex-col  my-auto rounded">
        <h1 className='font-semibold text-center text-2xl mb-3'>Student Registration</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 w-96 mx-auto'>
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className='font-semibold'>First Name</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className='p-1 rounded-sm' placeholder="John" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="middleName" className='font-semibold'>Middle Name</label>
            <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleChange} className='p-1 rounded-sm' placeholder="Naruto" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className='font-semibold'>Last Name</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className='p-1 rounded-sm' placeholder="Doe" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className='font-semibold'>Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className='p-1 rounded-sm' placeholder="abc@gmail.com" required />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className='font-semibold'>Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className='p-1 rounded-sm' placeholder="**********" required />
          </div>
          <br/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 m-auto text-white font-bold py-2 px-4 rounded self-end">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        

      </div>
    </div>
  );
}

export default StudentRegistration;
