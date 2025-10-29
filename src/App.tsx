import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import Result from "./pages/Result";
import logo from "./assets/logo.png";

function AppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleSearch = () => {
    setSearchTerm(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Only show search on home page
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen">
      <header className="w-full bg-white shadow-header sticky top-0 z-20">
        <div className="max-w-[1300px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="Highway Delite Logo" className="h-12 object-contain" />
          </div>

          {isHomePage && (
            <div className="flex items-center gap-3">
              <input
                className="w-[420px] max-w-[50vw] rounded-md bg-[#ededed] px-4 py-3 placeholder:text-gray-400"
                placeholder="Search experiences"
                aria-label="Search experiences"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                className="bg-brandYellow px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-shadow"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1300px] mx-auto px-6 py-10">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/experiences/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result/:ref" element={<Result />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

