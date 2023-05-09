import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";

import {
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  Center,
  Badge,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function MovieInfo() {
  const { movieId } = useParams();
  const { fetchMovieDetails } = useFetchMovies();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((details) => {
        console.log("Movie Details: ", details);
        setMovieDetails(details);
      })
      .catch((error) => {
        console.error();
      });
  }, [movieId, fetchMovieDetails]);

  return (
    <Center>
      <HStack spacing={4} mt={10} maxWidth="66%">
        <Box>
          <Image
            src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="md"
          />
        </Box>

        <VStack alignItems="flex-start" spacing={4} maxWidth="33%">
          <Heading as="h2" size="xl">
            {movieDetails.original_title}
          </Heading>
          <HStack>
            <Badge bg="#FA8128" color="black">
              {Math.round(movieDetails.vote_average * 10)}%
            </Badge>
            <Text>{movieDetails.release_date}</Text>
            <Tooltip
              label="Add to favorites"
              aria-label="Add to favorites tooltip"
            >
              <IconButton
                aria-label="Add movie to favorites"
                icon={<AddIcon />}
                variant="outline"
              />
            </Tooltip>
          </HStack>
          <Heading as="h3" size="lg">
            {"Overview"}
          </Heading>
          <Text>{movieDetails.overview}</Text>
        </VStack>
      </HStack>
    </Center>
  );
}
