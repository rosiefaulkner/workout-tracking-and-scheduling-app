import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiosInstance';

const Login = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/users')
      .then(response => console.log("response: ", response))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Login;
