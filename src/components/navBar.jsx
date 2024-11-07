import { Link } from "react-router-dom";
// import React, { useState } from "react";

function NavBar() {
  return (
    <div>
      <header className="bg-[#08294a] py-2 pb-4 font-array sticky top-0 w-full z-10">
        <div className="max-w-full mx-auto px-8">
          <nav className="flex items-center justify-between gap-5">
            {/* Left Section: Logo and Brand Name */}
            <div className="flex items-center gap-5">
              {/* Logo */}
              <h1 className="text-[#e8f0e5] font-medium text-5xl">Dialecto</h1>
            </div>

            {/* Right Section: Navigation and Profile */}
            <div className="flex items-center gap-8">
              {/* Navigation Links */}
              <Link to="/aboutUs">
                <div className="flex font-jersey items-center gap-8">
                  <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-2xl">
                    About Us
                  </div>
                </div>
              </Link>

              {/* Profile Section */}
              <div className="flex items-center gap-5">
                <button className="text-white font-jersey border border-white px-4 py-1 rounded transition duration-300 hover:bg-[#960909] hover:text-white text-lg">
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
