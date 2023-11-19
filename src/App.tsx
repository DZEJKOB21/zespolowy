import React from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import { AuthContextProvider } from './context/AuthContext';
import Dashboard from './dashboard/Dashboard';
import CVForm from './CVForm/CVForm';
import JobOfferForm from './JobOffer/JobOfferForm';
import Panel from './employee/Panel';
import Edit from './employee/Edit';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={
            <LoginPage />
          } />
          <Route path='/login' element={
            <LoginPage />
          } />
          <Route path='/register' element={
            <RegisterPage />
          } />
          <Route path='/dashboard' element={
            <Dashboard />
          } />
          <Route path='/form' element={
            <CVForm />
          } />
          <Route path='/joboffer' element={
            <JobOfferForm />
          } />
          <Route path='/panel' element={
            <Panel />
          } />
          <Route path='/panel/edit' element={
            <Edit />
          } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
