import React, { useContext } from "react";
import { MovieContext } from "../context/movieContext";
import CardImage from "../commons/CardImage";
import { SimpleGrid } from "@chakra-ui/react";

function MovieGrid() {
  const { movies } = useContext(MovieContext);

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="10" p="5">
      {movies.slice(0, 20).map((movie) => (
        <CardImage key={movie.id} movie={movie} />
      ))}
    </SimpleGrid>
  );
}

export default MovieGrid;
