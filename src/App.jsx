import "./App.css";

import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MovieGrid from "./components/MovieGrid";
import { Route, Routes } from "react-router-dom";

import MovieContextProvider from "./context/movieContext";
import { useEffect } from "react";
import axios from "axios";
import * as settings from "./settings/index";

function App() {
  useEffect(() => {
    axios
      .get(`${settings.axiosURL}/api/users/me`)
      .then((response) => {
        if (response.status === 200) {
          // logUser(response.data);
          console.log(response);
        }
      })
      .catch((error) => {
        console.log("Error fetching user:", error);
      });
  }, []);

  return (
    <MovieContextProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:category" element={<MovieGrid />} />
        </Routes>
      </>
    </MovieContextProvider>
  );
}

export default App;
