// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./webPages/signIn.jsx";
import SignUp from "./webPages/signUp.jsx";
import HomePage from "./webPages/homePage.jsx";
import DailyLearning from "./webPages/dailyLearning.jsx";
import StoryMode from "./webPages/storyMode.jsx";
import Scrabble from "./webPages/scrabble.jsx";

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
          <Route path="/home" element={<HomePage />} />

          {/* Define route for Daily Learning page */}
          <Route path="/dailyLearning" element={<DailyLearning />} />

          {/* Define route for StoryMode page */}
          <Route path="/storyMode" element={<StoryMode />} />

          {/* Define route for Daily Learning page */}
          <Route path="/scrabble" element={<Scrabble />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
