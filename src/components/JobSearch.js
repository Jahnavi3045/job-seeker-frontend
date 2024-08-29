import React, { useState } from 'react';
import axios from 'axios';
import '../styles/JobSearch.css';

const JobSearch = () => {
  // const [qualifications, setQualifications] = useState('');
  // const [location, setLocation] = useState('');
  // const [type, setType] = useState('');
  const [preferences, setPreferences] = useState({
    location: '',
    type: '',
    qualification: ''
  });

  const [jobs, setJobs] = useState([]);
  const [noJobsFound, setNoJobsFound] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: value
    }));
  };
  const apiBaseUrl=process.env.REACT_API_URL;
  const handleSearch = async () => {
    try {
      // Make an API request to get jobs based on user preferences
      const response = await axios.get(`${apiBaseUrl}/api/jobs`, {
        params: {
          location: preferences.location,
          type: preferences.type,
          qualification: preferences.qualification
        }
      });

      // Update the jobs state with the response data
      const jobResults = response.data;

      if (jobResults.length === 0) {
        setNoJobsFound(true);
      } else {
        setNoJobsFound(false);
        setJobs(jobResults);
      }

      setPreferences({
        location: '',
        type: '',
        qualification: ''
      })

    } catch (error) {
      console.error('Error fetching jobs:', error);
      setNoJobsFound(true);
      setJobs([]);

      setPreferences({
        location: '',
        type: '',
        qualification: ''
      });
    }
  };

  return (
    <div className="job-search">
      <h2 style={{color:'#1520A6'}}>Find Your Ideal Job</h2>
      <div className="search-form">
        <label>
          Qualification:
          <input
            type="text"
            name="qualification"
            value={preferences.qualification}
            onChange={handleChange}
            placeholder="Enter qualification"
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={preferences.location}
            onChange={handleChange}
            placeholder="Enter location"
          />
        </label>

        <label>Job Type:</label>
        <select name="type" value={preferences.type} onChange={handleChange}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <button onClick={handleSearch}>Search Jobs</button>
      </div>

      <div className="job-results">
        {noJobsFound ? (
          <p>No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.required_qualifications}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;



