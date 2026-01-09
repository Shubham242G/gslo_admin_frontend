import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white fixed left-0 top-0 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          GSLO Admin
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <Link
          to="/dashboard"
          className={`block px-6 py-3 transition-all duration-200 ${
            isActive('/dashboard')
              ? 'bg-blue-600 border-l-4 border-blue-400'
              : 'hover:bg-gray-700 hover:border-l-4 hover:border-gray-500'
          }`}
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </span>
        </Link>

        <Link
          to="/blogs"
          className={`block px-6 py-3 transition-all duration-200 ${
            isActive('/blogs')
              ? 'bg-blue-600 border-l-4 border-blue-400'
              : 'hover:bg-gray-700 hover:border-l-4 hover:border-gray-500'
          }`}
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blogs
          </span>
        </Link>

        <Link
          to="/news"
          className={`block px-6 py-3 transition-all duration-200 ${
            isActive('/news')
              ? 'bg-blue-600 border-l-4 border-blue-400'
              : 'hover:bg-gray-700 hover:border-l-4 hover:border-gray-500'
          }`}
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
            </svg>
            News/Magazine
          </span>
        </Link>

        <Link
          to="/testimonials"
          className={`block px-6 py-3 transition-all duration-200 ${
            isActive('/testimonials')
              ? 'bg-blue-600 border-l-4 border-blue-400'
              : 'hover:bg-gray-700 hover:border-l-4 hover:border-gray-500'
          }`}
        >
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Testimonials
          </span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
