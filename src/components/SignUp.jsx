import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../hooks/useInput";
import * as settings from "../settings";
import { Link } from "react-router-dom";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  ButtonGroup,
} from "@chakra-ui/react";

export default function SignUp() {
  const navigate = useNavigate();
  const userName = useInput();
  const email = useInput();
  const password = useInput();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      userName: userName.value,
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${settings.axiosURL}/api/users/signup`, data)
      .then((res) => res.data)
      .then((user) => {
        // navigate(`/api/${user.id}`);
        navigate("/");
      });
  };

  return (
    <Box
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.700")}
      maxW="md"
      mx="auto"
      mt="10"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>UserName</FormLabel>
            <Input {...userName} placeholder="UserName" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input {...email} placeholder="Email" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input {...password} type="password" placeholder="Password" />
          </FormControl>
          <ButtonGroup gap="2">
            <Button type="submit" colorScheme="orange" size="lg" fontSize="md">
              Sign Up
            </Button>
            <Button
              type="submit"
              colorScheme="orange"
              size="lg"
              fontSize="md"
              variant="ghost"
              as={Link}
              to="/"
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Stack>
      </form>
    </Box>
  );
}
