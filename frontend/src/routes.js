import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Users from './pages/Users';
import Login from './pages/Login';
import MyProgram from './pages/MyProgram';
import Create from './pages/Create';
import NotFound from './pages/NotFound';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<Users />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/my-program" element={<MyProgram />} />
      <Route path="/workout/create" element={<Create />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
