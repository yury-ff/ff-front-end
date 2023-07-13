import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(null);
const url = "https://server.forkedfinance.xyz";

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${url}/api/v1/users/showMe`, {
        withCredentials: true,
      });
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete(`${url}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
