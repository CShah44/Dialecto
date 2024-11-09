import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";

const SignUp = () => {
  const [username, setUsername] = useState(""); // Keeping only username state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { username: user, signup } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
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

    setIsLoading(true);
    try {
      await signup(username, password);
    } catch (error) {
      toast.error("Could not register");
    }
    setIsLoading(false);

    navigate("/home"); // Redirect to home after sign-up
  };

  return (
    <div
      className="flex items-center justify-center h-screen font-array"
      style={{
        backgroundImage: "url(/backgrounds/bg1.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-[#090051] border-gray-400 border-[1.5px] p-8 rounded-lg shadow-md w-96">
        <h2 className="text-4xl mb-6 text-center text-gray-200">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 font-medium text-gray-300">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your username"
            required
          />

          <label className="mb-2 font-medium text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />

          <label className="mb-2 font-medium text-gray-300">
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
            disabled={isLoading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up{" "}
            {isLoading && <span className="ml-2 animate-pulse">🚀</span>}
          </button>
        </form>

        {/* Sign In Button */}
        <div className="text-center mt-4">
          <p className="text-gray-500">Already have an account?</p>
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
