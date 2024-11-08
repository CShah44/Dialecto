import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [languageCode, setLanguageCode] = useState("es-ES");
  const [language, setLanguage] = useState("Spanish");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage("Spanish");
      localStorage.setItem("language", "Spanish");
    }

    updateLanguage(language);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [language]);

  const login = async (username, password) => {
    const res = await fetch("https://dialecto.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log(res);

    if (!res.ok) {
      console.error("Login failed");
      return;
    }

    const data = await res.json();

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = async () => {
    const res = await fetch("https://dialecto.onrender.com/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);

    if (res.ok) {
      setUser(null);
      setTotalScore(0);
      localStorage.removeItem("user");
    } else {
      console.error("Logout failed");
    }
  };

  const signup = async (username, password) => {
    const res = await fetch("https://dialecto.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    console.log(res);

    if (!res.ok) {
      console.error("Signup failed");
      return;
    }

    const data = await res.json();

    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const updateLanguage = (newLanguage) => {
    if (newLanguage === "Japanese") {
      setLanguageCode("ja-JP");
    } else if (newLanguage === "Spanish") {
      setLanguageCode("es-ES");
    } else if (newLanguage === "French") {
      setLanguageCode("fr-FR");
    } else if (newLanguage === "Italian") {
      setLanguageCode("it-IT");
    } else if (newLanguage === "German") {
      setLanguageCode("de-DE");
    } else if (newLanguage === "Gujarati") {
      setLanguageCode("gu-IN");
    } else if (newLanguage === "Telugu") {
      setLanguageCode("te-IN");
    } else {
      setLanguageCode("en-US");
    }

    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const refreshUserData = async () => {
    try {
      const response = await fetch("https://dialecto.onrender.com/getscores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          language,
        }),
      });
      if (response.ok) {
        const newScores = await response.json();

        const x =
          newScores.languages["FRENCH"] +
          newScores.languages["SPANISH"] +
          newScores.languages["JAPANESE"] +
          newScores.languages["GERMAN"] +
          newScores.languages["ITALIAN"] +
          newScores.languages["TELUGU"] +
          newScores.languages["GUJARATI"];
        setTotalScore(x);
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  const value = {
    user,
    language,
    languageCode,
    login,
    logout,
    signup,
    updateLanguage,
    refreshUserData,
    totalScore,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
