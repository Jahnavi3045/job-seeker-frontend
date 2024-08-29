import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
  });

  const handleChange =(e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('resume', formData.resume);

    const apiBaseUrl=process.env.REACT_API_URL;

    try {
      const response = await axios.post(`${apiBaseUrl}/api/users/signup`, data);
      console.log('Response:', response.data); // Log the response from the backend
      alert('Signup successful');
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume: null
      });
    } catch (error) {
      console.error('Error occurred while signing up:', error.response ? error.response.data : error.message);
      alert('There was an error signing up. Please try again.');
    }
  };

  return (
    <div>
      <h1 style={{color:'#1520A6'}}>Job Seeker Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Resume:</label>
        <input type="file" name="resume" onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;
