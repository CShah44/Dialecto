// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./webPages/signIn.jsx";
import SignUp from "./webPages/signUp.jsx";
import HomePage from "./webPages/homePage.jsx";
import DailyLearning from "./webPages/dailyLearning.jsx";
import StoryMode from "./webPages/storyMode.jsx";
import MemoryGame from "./webPages/memoryGame.jsx";
import AboutUs from "./webPages/aboutUs.jsx";
import Pixey from "./webPages/pixey.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <Toaster />
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/aboutUs" element={<AboutUs />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dailyLearning"
              element={
                <ProtectedRoute>
                  <DailyLearning />
                </ProtectedRoute>
              }
            />
            <Route
              path="/storyMode"
              element={
                <ProtectedRoute>
                  <StoryMode />
                </ProtectedRoute>
              }
            />
            <Route
              path="/memoryGame"
              element={
                <ProtectedRoute>
                  <MemoryGame />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pixey"
              element={
                <ProtectedRoute>
                  <Pixey />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
