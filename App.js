import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BlogList from './pages/BlogList';
import BlogForm from './pages/BlogForm';
import NewsList from './pages/NewsList';
import NewsForm from './pages/NewsForm';
import TestimonialList from './pages/TestimonialList';
import TestimonialForm from './pages/TestimonialForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          <Route path="/blogs" element={<PrivateRoute><BlogList /></PrivateRoute>} />
          <Route path="/blogs/create" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
          <Route path="/blogs/edit/:id" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
          
          <Route path="/news" element={<PrivateRoute><NewsList /></PrivateRoute>} />
          <Route path="/news/create" element={<PrivateRoute><NewsForm /></PrivateRoute>} />
          <Route path="/news/edit/:id" element={<PrivateRoute><NewsForm /></PrivateRoute>} />
          
          <Route path="/testimonials" element={<PrivateRoute><TestimonialList /></PrivateRoute>} />
          <Route path="/testimonials/create" element={<PrivateRoute><TestimonialForm /></PrivateRoute>} />
          <Route path="/testimonials/edit/:id" element={<PrivateRoute><TestimonialForm /></PrivateRoute>} />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
