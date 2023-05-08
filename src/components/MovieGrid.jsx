import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/movieContext";
import CardImage from "../commons/CardImage";
import { SimpleGrid } from "@chakra-ui/react";

function MovieGrid() {
  const { movies, updateMovies } = useContext(MovieContext);
  const { category } = useParams();
  const { fetchMovies, loading } = useContext(MovieContext);

  // useEffect(() => {
  //   if (!loading) {
  //     fetchMovies(category).then((fetchedMovies) => {
  //       updateMovies(fetchedMovies);
  //     });
  //   }
  // }, [category, fetchMovies, loading, updateMovies]);

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" p="5">
      {movies.slice(0, 20).map((movie) => (
        <CardImage key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
