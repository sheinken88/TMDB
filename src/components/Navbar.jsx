import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, userName, logOut } = useContext(AuthContext);
  console.log("userName: ", userName);
  console.log("isAuthenticated: ");
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        p="4"
        backgroundColor="#2B2D42"
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
              <MenuItem as={Link} to="">
                Popular
              </MenuItem>
              <MenuItem as={Link} to="">
                Upcoming
              </MenuItem>
              <MenuItem as={Link} to="">
                Top Rated
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton fontSize="lg" color="white">
              Tv shows
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="">
                Popular
              </MenuItem>
              <MenuItem as={Link} to="">
                Upcoming
              </MenuItem>
              <MenuItem as={Link} to="">
                Top Rated
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Spacer />
        {isAuthenticated ? (
          <h1>{userName}</h1>
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
