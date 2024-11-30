"use client";
import React, { useState } from "react";
import { Button, Input, VStack, Box, Center, Flex } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm();

  const history = useHistory();

  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility

  const [profilePic, setProfilePic] = useState(null);

  // Handle form submission
  const onSubmit = async (formData) => {
    if (profilePic) {
      const base64Image = await convertToBase64(profilePic);
      formData.pic = base64Image;
    } else {
      formData.pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Renamed 'data' from axios response to 'response'
      const response = await axios.post("/api/user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        pic: formData.pic,
      }, config);

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      history.push("/chats");

    } catch (error) {
      console.log(error);
    }
  };

  // Validate password confirmation
  const handlePasswordValidation = (e) => {
    const password = getValues("password");
    const confirmPassword = e.target.value;

    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      clearErrors("confirmPassword");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <Center>
      <Box
        p={6}
        borderWidth={1}
        borderRadius="md"
        width="100%"
        maxWidth="400px"
        boxShadow="lg"
        mt="5px"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <Field label="Name" invalid={!!errors.name} errorText={errors.name?.message}>
              <Input
                placeholder="Enter your Name"
                {...register("name", { required: "Name is required" })}
              />
            </Field>

            <Field label="Email" invalid={!!errors.email} errorText={errors.email?.message}>
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

            <Field label="Password" invalid={!!errors.password} errorText={errors.password?.message}>
              <Flex alignItems="center">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your Password"
                  width="80%" // Set the width to 80%
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
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

            <Field label="Confirm Password" invalid={!!errors.confirmPassword} errorText={errors.confirmPassword?.message}>
              <Flex alignItems="center">
                <Input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm your Password"
                  width="80%" // Set the width to 80%
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                  onChange={handlePasswordValidation} // Run validation on input change
                />
                <Button
                  onClick={() => setConfirmPasswordVisible((prevState) => !prevState)}
                  size="sm"
                  variant="link"
                  colorScheme="blue"
                  ml={2}
                  width="20%" // Set the width of the button to 20%
                >
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </Button>
              </Flex>
            </Field>

            <Field label="Profile Picture (Optional)">
              <Input
                type="file"
                p="1.5"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Field>

            <Box w="100%" display="flex" justifyContent="center" mt="4">
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                borderRadius="full"
                boxShadow="md"
                _hover={{ bg: "blue.600" }}
                _active={{ bg: "blue.700" }}
                _focus={{ boxShadow: "0 0 0 3px rgba(66,153,225,0.6)" }}
              >
                Submit
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
