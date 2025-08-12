import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Films from './pages/Films';
import Awards from './pages/Awards';
import Certification from './pages/Certification';
import News from './pages/News';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './Dashboard';
import Audition from './pages/Audition';
import './Global.css';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import AdminResetPassword from './pages/admin/AdminResetPassword';
import AdminUpdatePassword from './pages/admin/AdminUpdatePassword';

function MainSite() {
  return (
    <Layout>
      <div className="app-container">
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="films"><Films /></section>
        <section id="awards"><Awards /></section>
        <section id="certification"><Certification /></section>
        <section id="news"><News /></section>
        <section id="contact"><Contact /></section>
      </div>
    </Layout>
  );
}

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(() => {
    console.log("App.jsx - isLoggedIn updated to:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<MainSite />} />
        <Route path="/audition" element={<Audition />} />

        <Route path="/reset-password" element={<ResetPassword />} />
   <Route path="/update-password" element={<UpdatePassword />} />
   <Route path="/admin-forgot-password" element={< AdminResetPassword />} /> 
   <Route path="/admin-update-password" element={<AdminUpdatePassword />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
                <Login onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
                
                <Dashboard onLogout={() => setIsLoggedIn(false)} />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
