import axios from "axios";
import React, { useContext, useState } from "react";
import { Link as ReactRouterLink, Navigate } from "react-router-dom";
import { AppContext } from "../components/AppContextProvider";
// import { toast } from "react-hot-toast";
import { toast } from 'react-toastify';
import { serverLink } from "../main";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setIsLoading] = useState(false)
  const { setIsAuth, isAuth,setUserName,setAccessToken } =
    useContext(AppContext);

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${serverLink}/api/auth/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      setIsLoading(false);
      toast.success(data.message);
      setUserName(data.data.user.username);
      setIsAuth(true);
      setAccessToken(data.data.accessToken)
      setEmail("");
      setPassword("");    
    } catch (error) {  
      toast.error(error.response.data.error);
      setIsLoading(false);
      setIsAuth(false);
    }
  };

  if (isAuth) return <Navigate to="/" />;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input
                type="email"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isDisabled={loading ? true : false}
                onClick={handleForm}
              >
                Sign in
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                New here?{" "}
                <ReactRouterLink color={"blue.400"} to="/register">
                  Register
                </ReactRouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
