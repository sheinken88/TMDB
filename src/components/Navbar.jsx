import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import * as settings from "../settings";
import { useNavigate } from "react-router-dom";
import useAuth from "../settings/useAuth";
import { MovieContext } from "../context/movieContext";
import useFetchMovies from "../hooks/useFetchMovies";
import useInput from "../hooks/useInput";

import {
  Button,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Box,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, userName, logOut } = useContext(AuthContext);
  const { fetchMovies, fetchSearch, loading } = useFetchMovies();
  const { updateMovies } = useContext(MovieContext);
  const navigate = useNavigate();
  const searchInput = useInput();

  const handleClick = (type, category) => {
    if (!loading) {
      fetchMovies(type, category).then((movies) => {
        updateMovies(movies);
      });
    }
    navigate(`/${type}/${category}`);
  };
  const handleOnSubmit = (input) => {
    if (!loading) {
      fetchSearch(input).then((movies) => {
        updateMovies(movies);
        navigate("/");
      });
    }
  };

  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="4"
        backgroundColor="#2B2D42"
        // as="header"
        // position="fixed"
        // width="100%"
      >
        <Box p="2">
          <Link to="/">
            <Heading
              size="xl"
              color="transparent"
              bgGradient="linear(to-r, white, orange)"
              bgClip="text"
            >
              TMDB
            </Heading>
          </Link>
        </Box>
        <Flex ml="40" gap="8">
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Movies
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                to="/movies/popular"
                onClick={() => handleClick("movie", "popular")}
              >
                Popular
              </MenuItem>
              <MenuItem
                as={Link}
                to="/movies/upcoming"
                onClick={() => handleClick("movie", "upcoming")}
              >
                Upcoming
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Tv shows
            </MenuButton>
            <MenuList>
              <MenuItem
                as={Link}
                to="/tv/popular"
                onClick={() => handleClick("tv", "popular")}
              >
                Popular
              </MenuItem>
              <MenuItem
                as={Link}
                to="/tv/upcoming"
                onClick={() => handleClick("tv", "top_rated")}
              >
                Top Rated
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Spacer />
        <Box mr={10}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit(searchInput.value);
              // searchInput.setValue("");
            }}
          >
            <Flex>
              <Input
                placeholder="Search"
                variant="filled"
                size="md"
                borderRadius="full"
                bg="white"
                boxShadow="md"
                _hover={{ boxShadow: "lg" }}
                _focus={{ boxShadow: "lg", color: "white" }}
                value={searchInput.value}
                onChange={searchInput.onChange}
              />
              <Button
                type="submit"
                size="md"
                ml={2}
                px={8}
                borderRadius="full"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
              >
                Search
              </Button>
            </Flex>
          </form>
        </Box>
        {isAuthenticated ? (
          <Menu>
            <MenuButton fontSize="2xl" color="white">
              {userName}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/">
                Account
              </MenuItem>
              <MenuItem as={Link} to="">
                My list
              </MenuItem>
              <MenuDivider />

              <MenuItem as={Link} to="/" onClick={logOut}>
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <ButtonGroup gap="2">
            <Link to="/signup">
              <Button colorScheme="orange" variant="outline">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="orange">Log in</Button>
            </Link>
          </ButtonGroup>
        )}
      </Flex>
    </>
  );
}

export default Navbar;
