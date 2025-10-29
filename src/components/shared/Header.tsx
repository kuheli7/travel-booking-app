import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-header">
      <div className="px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="BookIt" className="h-12" />
        </Link>
        
        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search experiences..."
            className="w-96 rounded-md bg-[#ededed] px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brandYellow/30"
            aria-label="Search experiences"
          />
          <button className="ml-4 bg-brandYellow hover:brightness-95 rounded-md px-4 py-2 text-sm font-medium text-brandDark transition-all">
            Search
          </button>
        </div>
        
        <button className="md:hidden text-brandDark" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
