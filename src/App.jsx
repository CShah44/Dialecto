// src/App.jsx
// import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./webPages/signIn.jsx";
import SignUp from "./webPages/signUp.jsx";
import HomePage from "./webPages/homePage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define route for Sign In page */}
          <Route path="/" element={<SignIn />} />

          {/* Define route for Sign Up page */}
          <Route path="/signup" element={<SignUp />} />

          {/* Define route for Home page (after sign in or sign up) */}
          <Route path="/HomePage" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
