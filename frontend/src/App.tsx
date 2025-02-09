import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PricingPlan from './pages/PricingPlan'
import EventDetails from './pages/EventDetails';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsRegistered(true);
    }
  }, []);

  const handleRegister = (token: string) => {
    localStorage.setItem('token', token);
    setIsRegistered(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsRegistered(false);
  };

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Navbar isRegistered={isRegistered} onLogout={handleLogout} />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="/login" element={<Login onLogin={handleRegister} />} />
            {/* <Route path="/pricing" element={isRegistered? <PricingPlan/> : <Navigate to ='/login'/>} /> */}
            <Route path="/pricing" element={<PricingPlan />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/dashboard/*" element={isRegistered ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
