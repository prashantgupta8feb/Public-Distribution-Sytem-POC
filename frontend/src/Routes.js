// src/Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from './components/Dashboard';
import RegistrationForm from './components/RegistrationForm';
import ApplicationStatus from './components/ApplicationStatus';
import ApproveApplication from './components/ApproveApplication';

const RoutesComponent = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="new-registration" element={<RegistrationForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="user-login" element={<LoginForm />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="application-status" element={<ApplicationStatus />} />
        <Route path="approve-application" element={<ApproveApplication />}/>
        {/* Add other routes if needed */}
      </Routes>
    </div>
  );
};

export default RoutesComponent;

