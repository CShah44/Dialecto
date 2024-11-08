// src/HomePage.jsx
import { Link } from "react-router-dom";
import Layout from "./layout.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useEffect, useState } from "react";

function HomePage() {
  const { language, user, updateLanguage, refreshUserData, totalScore } =
    useUser();
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setInterval(() => {
      fetch("https://dialecto.onrender.com/health").then((response) =>
        response.json()
      );
    }, 100000);
  }, []);

  useEffect(() => {
    const getLeaderboard = async () => {
      const res = await fetch("https://dialecto.onrender.com/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({
          language,
          username: user.username,
        }),
      });
      console.log(res);
      const data = await res.json();
      setCurrentLeaderboard(data.leaderboard);
      setLoading(false);
    };

    getLeaderboard();
    refreshUserData();
  }, [language, user, refreshUserData]);

  return (
    <Layout>
      <div className="flex m-12 h-screen w-[95%] bg-none text-black font-array">
        {/* <!-- Main Container --> */}
        <div className="flex items-start space-x-4 w-[100%]">
          {/* <!-- Left Content Area --> */}
          <div className="space-y-4 w-[75%]">
            {/* <!-- Banner/Header --> */}
            <div className="bg-blue-900/70 backdrop-blur-md text-white text-center rounded-lg h-[300px] w-[100%] flex items-center justify-center relative">
              <div className="flex flex-col justify-center items-start gap-4 m-10">
                <h1 className="text-6xl font-medium">
                  Welcome to Dialecto, {user.username}
                </h1>
                <div className="flex space-x-2 items-center">
                  <span>Which language do you want to learn?</span>
                  <select
                    value={language}
                    onChange={(e) => updateLanguage(e.target.value)}
                    className="px-4 py-2 text-white rounded-md bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all"
                  >
                    <option value="Telugu" className="text-black">
                      Telugu
                    </option>
                    <option value="Gujarati" className="text-black">
                      Gujarati
                    </option>
                    <option value="Spanish" className="text-black">
                      Spanish
                    </option>
                    <option value="French" className="text-black">
                      French
                    </option>
                    <option value="Italian" className="text-black">
                      Italian
                    </option>
                    <option value="German" className="text-black">
                      German
                    </option>
                    <option value="Japanese" className="text-black">
                      Japanese
                    </option>
                  </select>
                </div>
                <div className="flex justify-between text-4xl w-full font-jersey">
                  <h1>{totalScore} Points</h1>
                  {/* <h1>Rank #124</h1> */}
                </div>
              </div>
              <Link to="/pixey">
                <button className="absolute bottom-6 right-6 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-md backdrop-blur-sm border border-white/30 transition-all text-2xl">
                  Pixey
                </button>
              </Link>
            </div>

            {/* <!-- Content Boxes --> */}
            <div className="flex space-x-4 flex-row justify-between w-[100%]">
              <Link to="/dailyLearning">
                <div
                  className="shadow-md aspect-square h-[325px] flex items-center justify-center rounded-lg hover:scale-105"
                  style={{
                    backgroundImage: "url(/buttons/daily.png)",
                    backgroundSize: "cover",
                  }}
                ></div>
              </Link>
              <Link to="/storyMode">
                <div
                  style={{
                    backgroundImage: "url(/buttons/story.png)",
                    backgroundSize: "cover",
                  }}
                  className="shadow-md aspect-square h-[325px] flex items-center justify-center rounded-lg hover:scale-105"
                ></div>
              </Link>
              <Link to="/memoryGame">
                <div
                  style={{
                    backgroundImage: "url(/buttons/memory.png)",
                    backgroundSize: "cover",
                  }}
                  className="shadow-md aspect-square h-[325px] flex items-center justify-center rounded-lg hover:scale-105"
                ></div>
              </Link>
            </div>
          </div>

          {/* <!-- Sidebar --> */}
          <div className="bg-neutral-200/70 backdrop-blur-md rounded-lg shadow-md w-[25%] h-[80%] flex flex-col justify-start items-center">
            <h1 className="text-neutral-900 text-2xl p-4 mx-auto">
              Leaderboard
            </h1>
            {loading && (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              </div>
            )}
            <div className="w-full px-4 font-jersey">
              {currentLeaderboard?.map((user) => (
                <div
                  key={user.rank}
                  className="flex justify-between items-center py-2 border-b border-neutral-500 text-neutral-900 hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-md">#{user.rank}</span>
                    <span className="text-md">{user.username}</span>
                  </div>
                  <span className="text-md">{user.points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
