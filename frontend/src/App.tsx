import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import CreateTicket from './pages/patients/CreateTicket';
import Support from './pages/patients/Support';
import Settings from './pages/patients/Settings';
import Layout from './components/Layout';
import AdminDashboard from './pages/Admin/AdminDashboard';

const App: React.FC = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute redirectTo="/login" />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-ticket" element={<CreateTicket />} />
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />

          {/* Admin Pages */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          {/* <Route path="/manage-tickets" element={<ManageTickets />} />
          <Route path="/admin-settings" element={<AdminSettings />} /> */}

          {/* Medical Support Pages */}
          {/* <Route path="/support-dashboard" element={<SupportDashboard />} />
          <Route path="/active-tickets" element={<ActiveTickets />} />
          <Route path="/support-settings" element={<SupportSettings />} />
           */}
        </Route>
      </Route>


    </Routes>
    <Footer />
  </>
);

export default App;
