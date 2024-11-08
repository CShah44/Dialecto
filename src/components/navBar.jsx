import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
// import React, { useState } from "react";

function NavBar() {
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <header className="bg-blue-900/85 backdrop-blur-md py-2 pb-4 font-array sticky top-0 w-full z-10">
        <div className="max-w-full mx-auto px-8">
          <nav className="flex items-center justify-between gap-5">
            {/* Left Section: Logo and Brand Name */}
            <div className="flex items-end gap-5">
              {/* Logo */}
              <Link to="/home">
                <h1 className="text-[#e8f0e5] font-medium text-5xl">
                  Dialecto
                </h1>
              </Link>
              <span className="text-[#e8f0e5] font-light text-2xl font-jersey">
                a new learning experience
              </span>
            </div>

            {/* Right Section: Navigation and Profile */}
            <div className="flex items-center gap-8">
              {/* Navigation Links */}
              <Link to="/pixey">
                <div className="flex font-jersey items-center gap-8">
                  <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-2xl">
                    Pixey
                  </div>
                </div>
              </Link>
              <Link to="/aboutUs">
                <div className="flex font-jersey items-center gap-8">
                  <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-2xl">
                    About Us
                  </div>
                </div>
              </Link>

              {/* Profile Section */}
              <div onClick={handleLogout} className="flex items-center gap-5">
                <button className="text-white font-jersey border border-white px-4 py-1 rounded-full transition duration-300 hover:bg-[#960909] hover:text-white text-lg">
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
