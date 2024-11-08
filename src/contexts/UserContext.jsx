import { createContext, useState, useContext } from "react";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [languageCode, setLanguageCode] = useState("es-ES");
  const [language, setLanguage] = useState("Spanish");

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const updateLanguage = (newLanguage, newLanguageCode) => {
    setLanguageCode(newLanguageCode);
    setLanguage(newLanguage);
  };

  const value = {
    username,
    language,
    languageCode,
    updateUsername,
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
