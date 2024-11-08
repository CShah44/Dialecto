// src/HomePage.jsx
import { Link } from "react-router-dom";
import Layout from "./layout.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import { useEffect, useState } from "react";

function HomePage() {
  const { language, user, updateLanguage } = useUser();
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const x =
      user.languages["JAPANESE"] +
      user.languages["SPANISH"] +
      user.languages["FRENCH"] +
      user.languages["ITALIAN"] +
      user.languages["GERMAN"] +
      user.languages["TELUGU"] +
      user.languages["GUJARATI"];

    setTotalPoints(x);
  }, [user]);

  return (
    <Layout>
      <div className="flex m-12 h-screen w-[95%] bg-none text-black font-array">
        {/* <!-- Main Container --> */}
        <div className="flex items-start space-x-4 w-[100%]">
          {/* <!-- Left Content Area --> */}
          <div className="space-y-4 w-[75%]">
            {/* <!-- Banner/Header --> */}
            <div className="bg-blue-900/70 backdrop-blur-md text-white text-center rounded-lg h-[300px] w-[100%] flex items-center justify-center">
              <div className="flex flex-col justify-center items-start gap-4 m-10">
                <h1 className="text-6xl font-medium">
                  Welcome to Dialecto, {user.username}
                </h1>
                <div className="flex space-x-2 items-center">
                  <span>Select Language:</span>
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
                  <h1>{totalPoints} Points</h1>
                  <h1>Rank #124</h1>
                </div>
              </div>
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
                    backgroundImage: "url(/buttons/scrabble.png)",
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
            <div className="w-full px-4 font-jersey">
              {[
                { name: "Sarah Johnson", points: 2150, rank: 1 },
                { name: "Michael Chen", points: 2080, rank: 2 },
                { name: "Emma Davis", points: 1990, rank: 3 },
                { name: "Krish Patel", points: 1920, rank: 4 },
                { name: "Alex Thompson", points: 1875, rank: 5 },
                { name: "Maria Garcia", points: 1820, rank: 6 },
                { name: "David Kim", points: 1780, rank: 7 },
                { name: "Lisa Wang", points: 1750, rank: 8 },
                { name: "James Wilson", points: 1700, rank: 9 },
                { name: "Sophia Lee", points: 1650, rank: 10 },
              ].map((user) => (
                <div
                  key={user.rank}
                  className="flex justify-between items-center py-2 border-b border-neutral-500 text-neutral-900 hover:scale-105"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-md">#{user.rank}</span>
                    <span className="text-md">{user.name}</span>
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
