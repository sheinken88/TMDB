import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import * as settings from "../settings";
import { useNavigate } from "react-router-dom";
import useAuth from "../settings/useAuth";

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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, userName, logUser, logOut } =
    useContext(AuthContext);
  console.log("userName: ", userName);
  console.log("isAuthenticated: ", isAuthenticated);
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
          <Menu>
            <MenuButton fontSize="lg" color="white">
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

              <MenuItem as={Link} to="/">
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
