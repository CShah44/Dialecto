import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState(""); // Keeping only username state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Sign Up Username:", username, "Password:", password);
    navigate("/HomePage"); // Redirect to home after sign-up
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 font-medium text-gray-600">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your username"
            required
          />

          <label className="mb-2 font-medium text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />

          <label className="mb-2 font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-6 p-2 border border-gray-300 rounded"
            placeholder="Confirm your password"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Button */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 mt-2 underline hover:text-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
