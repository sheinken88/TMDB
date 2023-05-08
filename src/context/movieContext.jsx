import { createContext, useState } from "react";
import useFetchMovies from "../hooks/useFetchMovies";

// defino instancia inicial
const initialState = {
  movies: [],
  fetchMovies: () => null,
};

// creo el contexto
export const MovieContext = createContext(initialState);

// creo el vehiculo del contexto con sus propiedades (estados y funciones)
const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const { fetchMovies } = useFetchMovies();

  const updateMovies = (newMovies) => {
    setMovies(newMovies);
  };

  return (
    <MovieContext.Provider value={{ movies, updateMovies, fetchMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
