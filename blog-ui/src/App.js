import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPosts = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/posts');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('There was a problem fetching data. Please try again.'); // Set error state
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>All Users' Posts and Comments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p> // Display error message
      ) : (
        <div className="users-container">
          {/* Rest of your rendering logic for userData */}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
