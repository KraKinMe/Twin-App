import React, { useState } from 'react';
import { Button, Input, VStack, Box, Center, Flex } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const history = useHistory();

  const onSubmit = (data) => {
    // Log form data to the console
    console.log("Form Data: ", data);

    // Check if email or password is missing
    if (!data.email || !data.password) {
      alert("Please fill all the fields");
      console.log("Error: Missing email or password");
    } else {
      // Log the request details before sending the API request
      console.log("Sending login request with data:", {
        email: data.email,
        password: data.password,
      });

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // Sending login request to the API
        axios.post("/api/user/login", {
          email: data.email,
          password: data.password,
        }, config)
          .then((response) => {
            console.log("Response from server:", response);
            localStorage.setItem("userInfo", JSON.stringify(response.data));
            history.push("/chats");
          })
          .catch((error) => {
            // Check if the error has a response
            if (error.response) {
              console.log("Error Response from Server:", error.response); // Full response object
              console.log("Error Data from Response:", error.response.data); // Data inside the response
              console.log("Error Status Code:", error.response.status); // Status code (e.g., 401)
              console.log("Error Status Text:", error.response.statusText); // Status text (e.g., Unauthorized)
              console.error("Error message:", error.response.data.message); // Specific error message if available
              alert(`Login failed: ${error.response.data.message || 'Invalid credentials'}`);
            } 
            // Check if there was no response (e.g., network issues)
            else if (error.request) {
              console.log("Error Request Details:", error.request);
              alert("No response from the server. Please try again later.");
            } 
            // Check for other errors
            else {
              console.log("Error Message:", error.message);
              alert("An unexpected error occurred.");
            }
          });
      } catch (error) {
        console.log("Unexpected Error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Center>
      <Box
        p={6}
        borderWidth={1}
        borderRadius="md"
        width="100%"
        maxWidth="400px" // Set max width to limit form width
        boxShadow="lg"
        mt="5px" // Adds top margin for spacing
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">

            <Field
              label="Email"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                placeholder="Enter your Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </Field>

            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Flex alignItems="center">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  width="80%" // Set the width to 80%
                />
                <Button
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                  size="sm"
                  variant="link"
                  colorScheme="blue"
                  ml={2}
                  width="20%" // Set the width of the button to 20%
                >
                  {passwordVisible ? "Hide" : "Show"}
                </Button>
              </Flex>
            </Field>

            <Box w="100%" display="flex" justifyContent="center" mt="4">
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                borderRadius="full"
                boxShadow="md"
                _hover={{
                  bg: "blue.600", // Darker blue on hover
                }}
                _active={{
                  bg: "blue.700", // Even darker blue on active click
                }}
                _focus={{
                  boxShadow: "0 0 0 3px rgba(66,153,225,0.6)", // Focus ring
                }}
              >
                LogIn
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
