import { Badge, Box, Image, Text } from "@chakra-ui/react";
// import { useContext } from "react";
// import { MovieContext } from "../context/movieContext";
import { Link } from "react-router-dom";

export default function CardImage({ movie }) {
  if (!movie) return null;
  const { poster_path, vote_average, title, release_date } = movie;
  // console.log(movie);

  return (
    <Box
      as={Link}
      to={`/movies/info/${movie.id}`} // le seteo la ruta dinamica en base al id del elemento movie.
      marginTop="2rem"
      marginLeft="2rem"
      maxW="200px"
      borderWidth="0.5px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box position="relative">
        <Badge
          width="40px"
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="full"
          bg="#FA8128"
          color="black"
          position="absolute"
          bottom="-1.5rem"
          left="0.5rem"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.2)"
        >
          {Math.round(vote_average * 10)}%
        </Badge>
        <Image
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          h="300px"
          w="200px"
        />
      </Box>
      <Box p="6">
        <Text fontSize="m" fontWeight="bold">
          {title}
        </Text>
        <Text mt="2" color="gray.500">
          {release_date}
        </Text>
      </Box>
    </Box>
  );
}
