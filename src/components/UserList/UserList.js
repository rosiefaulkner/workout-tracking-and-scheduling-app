import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data from PHP backend
    axios
      .get('http://localhost/web/src/get_users.php') // Update with your PHP backend API URL
      .then((response) => {
        setUsers(response.data); // Set the fetched users to state
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.log("err", err);
        setError('Error fetching data');
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li> // Render user data
        ))}
      </ul>
    </div>
  );
};

export default UserList;