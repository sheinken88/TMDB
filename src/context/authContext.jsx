import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import * as settings from "../settings";
import Cookies from "js-cookie";

const initialState = {
  userName: "",
  email: "",
  isAuthenticated: false,
  logUser: () => null,
  logOut: () => null,
  fetchUser: () => null,
};
export const AuthContext = createContext(initialState);

const AuthContextProvider = ({ children }) => {
  const logUser = (user) => {
    setAuth({
      userName: user.userName,
      email: user.email,
      isAuthenticated: true,
    });
  };
  const logOut = () => {
    setAuth({
      userName: "",
      email: "",
      isAuthenticated: false,
    });
  };

  const fetchUser = () => {
    const token = Cookies.get("authToken");
    if (!token) return;

    axios
      .get(`${settings.axiosURL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          logUser(response.data);
        }
      })
      .catch((error) => {
        console.log("Error fetching user:", error);
      });
  };

  const [auth, setAuth] = useState({
    userName: "",
    email: "",
    isAuthenticated: false,
    logUser,
    logOut,
    fetchUser,
  });

  return (
    <AuthContext.Provider
      value={{
        userName: auth.userName,
        email: auth.email,
        isAuthenticated: auth.isAuthenticated,
        logUser,
        logOut,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
