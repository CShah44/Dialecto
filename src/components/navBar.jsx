// import { Link } from "react-router-dom";
// import React, { useState } from "react";

function NavBar() {
  return (
    <div>
      <header className="bg-[#1c4e80] py-2 sticky top-0 w-full z-10">
        <div className="max-w-full mx-auto px-8">
          <nav className="flex items-center justify-between gap-5">
            {/* Left Section: Logo and Brand Name */}
            <div className="flex items-center gap-5">
              {/* Logo */}
              <h1 className="text-[#e8f0e5] font-medium text-xl">Murnify</h1>
            </div>

            {/* Right Section: Navigation and Profile */}
            <div className="flex items-center gap-8">
              {/* Navigation Links */}
              <div className="flex items-center gap-8">
                <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-lg">
                  About Us
                </div>
              </div>

              {/* Profile Section */}
              <div className="flex items-center gap-5">
                <button className="text-white border border-white px-4 py-1 rounded transition duration-300 hover:bg-[#66b3e0] hover:text-white text-lg">
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
