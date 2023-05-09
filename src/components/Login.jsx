import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import * as settings from "../settings";
import { useNavigate } from "react-router-dom";
import useAuth from "../settings/useAuth";
// import Cookies from "js-cookie";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const navigate = useNavigate();
  const email = useInput();
  const password = useInput();
  const { logUser } = useAuth();

  const handeSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: email.value,
      password: password.value,
    };

    axios
      .post(`${settings.axiosURL}/api/users/login`, user, {
        withCredentials: true,
      })
      .then((result) => {
        console.log("result.data: ", result.data);
        // const token = result.data.token;
        // Cookies.set("token", token);

        logUser({
          userName: result.data.payload.userName,
          email: result.data.payload.email,
          // isAuthenticated: true,
        });

        navigate("/movies/popular");
      })

      .catch((err) => console.log(err));
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
      <form onSubmit={handeSubmit}>
        <Stack spacing={6}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email" {...email} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Password" {...password} />
          </FormControl>
          <Button type="submit" colorScheme="orange" size="lg" fontSize="md">
            Login
          </Button>
          <Button
            type="button"
            colorScheme="orange"
            size="xs"
            fontSize="md"
            variant="ghost"
            // as={Link}
            // to="/"
            //porque aca no funciona la opción as={Link} to="/" y en el componente SignUp si...?
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
