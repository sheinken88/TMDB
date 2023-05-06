import { useState } from "react";
import { createContext } from "react";

const initialState = {
  userName: "",
  email: "",
  isAuthenticated: false,
  logUser: () => null,
  logOut: () => null,
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
  const [auth, setAuth] = useState({
    userName: "",
    email: "",
    isAuthenticated: false,
    logUser,
    logOut,
  });

  return (
    <AuthContext.Provider
      value={{
        userName: auth.userName,
        email: auth.email,
        isAuthenticated: auth.isAuthenticated,
        logUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
