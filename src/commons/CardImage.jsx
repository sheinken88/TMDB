import { Badge, Box, Image, Text } from "@chakra-ui/react";

export default function CardImage() {
  return (
    <Box
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
          colorScheme="orange"
          position="absolute"
          bottom="-1.5rem"
          left="0.5rem"
          boxShadow="0px 0px 8px rgba(0, 0, 0, 0.2)"
        >
          {"80"}%
        </Badge>
        <Image
          src={"https://m.media-amazon.com/images/I/81EBp0vOZZL.jpg"}
          alt={"title"}
          h="300px"
          w="200px"
        />
      </Box>
      <Box p="6">
        <Text fontSize="m" fontWeight="bold">
          {"Lord of the rings"}
        </Text>
        <Text mt="2" color="gray.500">
          {"releaseDate"}
        </Text>
      </Box>
    </Box>
  );
}
