// import React, { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { MovieContext } from "../context/movieContext";
// import CardImage from "../commons/CardImage";
// import { SimpleGrid } from "@chakra-ui/react";

// function MovieGrid() {
//   const { movies, updateMovies } = useContext(MovieContext);
//   const { type, category } = useParams();
//   const { fetchMovies, loading } = useContext(MovieContext);

//   useEffect(() => {
//     setLoading(true);

//     const fetchData = () => {
//       if (type && category) {
//         return fetchMovies(type, category);
//       } else {
//         return fetchMovies("movies", "popular");
//       }
//     };

//     fetchData()
//       .then((fetchedMovies) => {
//         updateMovies(fetchedMovies);
//       })
//       .catch((error) => {
//         console.error("Error fetching movies: ", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [type, category, fetchMovies, updateMovies]);

//   return (
//     <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" p="5">
//       {movies.slice(0, 20).map((movie) => (
//         <CardImage key={movie.id} movie={movie} />
//       ))}
//     </SimpleGrid>
//   );
// }

// export default MovieGrid;

import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movieContext";
import CardImage from "../commons/CardImage";
import { SimpleGrid } from "@chakra-ui/react";

function MovieGrid() {
  const { movies, updateMovies } = useContext(MovieContext);
  const { type, category } = useParams();
  const { fetchMovies } = useContext(MovieContext);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const fetchedMovies = await fetchMovies(
  //       type || "movies",
  //       category || "popular"
  //     );
  //     updateMovies(fetchedMovies);
  //   };

  //   fetchData();
  // }, [type, category, fetchMovies, updateMovies]);

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" p="5">
      {movies.slice(0, 20).map((movie) => (
        <CardImage key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
