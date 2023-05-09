import { useState, useCallback } from "react";
import axios from "axios";

const apiKey = "a836767b9cc13ce5c4ff600a12dca56f";

const useFetchMovies = () => {
  //defino un estado para el fetch a la api
  const [loading, setLoading] = useState(false);

  const fetchMovies = (type, category) => {
    //seteo el estado a true
    setLoading(true);
    return axios
      .get(
        `https://api.themoviedb.org/3/${type}/${category}?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((response) => {
        // una vez trae las pelis seteo el estado a false nuevamente
        setLoading(false);
        return response.data.results;
      })
      .catch((error) => {
        // en caso no haya una respuesta satisfactoria seteo el estado a false
        setLoading(false);
        console.error();
        return [];
      });
  };

  const fetchSearch = (input) => {
    setLoading(true);
    return axios
      .get(
        `
    https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}&page=1`
      )
      .then((response) => {
        setLoading(false);
        return response.data.results;
      })
      .catch((error) => {
        setLoading(false);
        console.error();
        return [];
      });
  };

  // useCallback para evitar que re renderice
  const fetchMovieDetails = useCallback((movie_id) => {
    setLoading(true);
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`
      )
      .then((response) => {
        setLoading(false);
        // console.log("Movie details: ", response.data);
        return response.data;
      })
      .catch((error) => {
        setLoading(false);
        console.error();
        return [];
      });
  }, []);

  // retorno la fn y el estado para que puedan ser usados en otros componentes
  return { fetchMovies, fetchSearch, fetchMovieDetails, loading };
};

export default useFetchMovies;
