import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiosInstance';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.user_id}>{user.first_name}</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Users;
