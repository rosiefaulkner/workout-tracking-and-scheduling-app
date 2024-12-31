import React, { useEffect, createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const userData = localStorage.getItem("userData");
    try {
      return userData ? JSON.parse(userData) : { email: "Your email", first_name: "John", last_name: "Doe" };
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      return { email: "Your email", first_name: "John", last_name: "Doe" };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  }, [userData]);

  const logout = () => {
    setUserData({ email: null, first_name: null, last_name: null });
    localStorage.removeItem("userData");
  };

  return (
    <AppContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };