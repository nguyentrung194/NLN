import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeRoute } from './route/home.route';
import { RegisterRoute } from './route/register.route';
import { LoginRoute } from './route/login.route';
import { AdminRoute } from './route/admin.route';
import { NavLayout } from './layouts/nav';

function App() {
  return (
    <Routes>
      <Route element={<NavLayout />}>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/*" element={<Navigate to="/" replace={true} />} />
      </Route>
    </Routes>
  );
}

export default App;