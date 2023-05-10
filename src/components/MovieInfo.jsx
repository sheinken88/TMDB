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
  const { mediaType, mediaId } = useParams();
  const { fetchMediaDetails } = useFetchMovies();
  const [mediaDetails, setMediaDetails] = useState({});

  useEffect(() => {
    console.log("mediaType:", mediaType, "mediaId:", mediaId);
    fetchMediaDetails(mediaType, mediaId)
      .then((details) => {
        console.log("Media Details: ", details);
        setMediaDetails(details);
      })
      .catch((error) => {
        console.error();
      });
  }, [mediaType, mediaId, fetchMediaDetails]);

  const getTitle = () => {
    if (original_title) {
      return original_title;
    } else if (original_name) {
      return original_name;
    }
  };
  const {
    poster_path,
    vote_average,
    original_title,
    original_name,
    release_date,
    first_air_date,
  } = mediaDetails;

  const title = getTitle();

  return (
    <Center>
      <HStack spacing={4} mt={10} maxWidth="66%">
        <Box>
          <Image
            src={`https://image.tmdb.org/t/p/w200${mediaDetails.poster_path}`}
            objectFit="cover"
            width="100%"
            height="100%"
            borderRadius="md"
          />
        </Box>

        <VStack alignItems="flex-start" spacing={4} maxWidth="33%">
          <Heading as="h2" size="xl">
            {/* {mediaType === "movie"
              ? mediaDetails.original_title
              : mediaDetails.original_name} */}
            {title}
          </Heading>
          <HStack>
            <Badge bg="#FA8128" color="black">
              {Math.round(mediaDetails.vote_average * 10)}%
            </Badge>
            <Text>{mediaDetails.release_date}</Text>
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
          <Text>{mediaDetails.overview}</Text>
        </VStack>
      </HStack>
    </Center>
  );
}

//cambios.
