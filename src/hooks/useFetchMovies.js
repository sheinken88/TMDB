import { useState } from "react";
import axios from "axios";

const apiKey = "a836767b9cc13ce5c4ff600a12dca56f";

const useFetchMovies = () => {
  //defino un estado para el fetch a la api
  const [loading, setLoading] = useState(false);

  const fetchMovies = (category) => {
    //seteo el estado a true
    setLoading(true);
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`
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
  // retorno la fn y el estado para que puedan ser usados en otros componentes
  return { fetchMovies, loading };
};

export default useFetchMovies;
