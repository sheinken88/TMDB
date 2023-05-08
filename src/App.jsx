import "./App.css";

import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import MovieGrid from "./components/MovieGrid";
import { Route, Routes } from "react-router-dom";

import MovieContextProvider from "./context/movieContext";

function App() {
  return (
    <MovieContextProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/popular" element={<MovieGrid />} />
        </Routes>
      </>
    </MovieContextProvider>
  );
}

export default App;
