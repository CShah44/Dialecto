// import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-32 h-32">
        {/* Square Animation */}
        <div className="absolute top-0 left-0 w-32 h-32 border-4 border-gray-500 rounded animate-spin-squares">
          <div className="absolute w-8 h-8 bg-blue-500 rounded-full animate-pulse top-0 left-0"></div>
          <div className="absolute w-8 h-8 bg-red-500 rounded-full animate-pulse top-0 right-0"></div>
          <div className="absolute w-8 h-8 bg-green-500 rounded-full animate-pulse bottom-0 left-0"></div>
          <div className="absolute w-8 h-8 bg-yellow-500 rounded-full animate-pulse bottom-0 right-0"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
