import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiosInstance';

const Account = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get('/account/get-user')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Account</h1>
      <ul>
        {users.map(user => (
          <li key={user.user_id}>{user.first_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
