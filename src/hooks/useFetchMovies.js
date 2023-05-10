import { useCallback } from "react";
import axios from "axios";

const apiKey = "a836767b9cc13ce5c4ff600a12dca56f";

const useFetchMovies = () => {
  const fetchMovies = (type, category) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/${type}/${category}?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((response) => {
        console.log("response.data", response.data);
        return response.data.results;
      })
      .catch((error) => {
        console.error();
        return [];
      });
  };

  const fetchSearch = (input) => {
    return axios
      .get(
        `
    https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${input}&page=1`
      )
      .then((response) => {
        return response.data.results;
      })
      .catch((error) => {
        console.error();
        return [];
      });
  };

  // useCallback para evitar que re renderice
  const fetchMediaDetails = useCallback((mediaType, mediaId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${apiKey}&language=en-US`
      )
      .then((response) => {
        // console.log("Movie details: ", response.data);
        return response.data;
      })
      .catch((error) => {
        console.error();
        return [];
      });
  }, []);

  // retorno la fn y el estado para que puedan ser usados en otros componentes
  return { fetchMovies, fetchSearch, fetchMediaDetails };
};

export default useFetchMovies;

//cambios.
