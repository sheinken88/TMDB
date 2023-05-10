import { Badge, Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CardImage({ movie }) {
  console.log("MOVIE:", movie);

  if (!movie) return null;
  const {
    poster_path,
    vote_average,
    original_title,
    original_name,
    release_date,
    first_air_date,
  } = movie;

  const getTitle = () => {
    if (original_title) {
      return original_title;
    } else if (original_name) {
      return original_name;
    }
  };
  const getDate = () => {
    if (release_date) {
      return release_date;
    } else if (first_air_date) {
      return first_air_date;
    }
  };

  const title = getTitle();
  const date = getDate();

  return (
    <Box
      as={Link}
      to={original_title ? `/movie/info/${movie.id}` : `/tv/info/${movie.id}`}
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
        <Text fontSize="m" fontWeight="bold" mt={5}>
          {title}
        </Text>
        <Text mt="2" color="gray.500">
          {date}
        </Text>
      </Box>
    </Box>
  );
}
