import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [languageCode, setLanguageCode] = useState("ja-JP");
  const [language, setLanguage] = useState();

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else {
      setLanguage("Japanese");
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    } else if (newLanguage === "Telugu") {
      setLanguageCode("te-IN");
    } else if (newLanguage === "Gujarati") {
      setLanguageCode("gu-IN");
    } else if (newLanguage === "Spanish") {
      setLanguageCode("es-ES");
    } else if (newLanguage === "French") {
      setLanguageCode("fr-FR");
    } else if (newLanguage === "Italian") {
      setLanguageCode("it-IT");
    } else if (newLanguage === "German") {
      setLanguageCode("de-DE");
    } else {
      setLanguageCode("en-US");
    }

    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const value = {
    user,
    language,
    languageCode,
    login,
    logout,
    signup,
    updateLanguage,
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
