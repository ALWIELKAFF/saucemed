import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaPepperHot } from "react-icons/fa";
import axios from "axios";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { InputGroup } from "@chakra-ui/react";
import * as yup from "yup";
import YupPassword from "yup-password";
import { baseUrl } from "../utils/config";
YupPassword;

const validationSchema = yup.object().shape({
  username: yup.string().required("Username cannot be empty"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Username cannot be empty"),
  password: yup.string().required("Password cannot be empty").min(6),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required("Password cannot be empty"),
});

const CardRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
  

        await axios.post(baseUrl + `/users/register`, {
          username: values.username,
          email : values.email,
          password : values.password
        })

        toast({
          title: "Register Success",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: "warning",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });

      }
    },
  });

  console.log(formik.errors);

  return (
    <Box w="400px" shadow="dark-lg" p="8" rounded="xl">
      <Text
        fontSize="30px"
        fontWeight="bold"
        justifyContent="center"
        align="center"
      >
        Welcome To SauceMed
      </Text>
      <Text justifyContent="space-between" align="center" display="flex">
        {" "}
        <FaPepperHot size="60px" /> <FaPepperHot size="60px" />{" "}
        <FaPepperHot size="60px" /> <FaPepperHot size="60px" />{" "}
        <FaPepperHot size="60px" />{" "}
      </Text>
      <Text mb="4" mt="4">
        Already have account ?
        <Text display="inline" color="yellow.500">
          <Link to="/login"> Login now!!! </Link>
        </Text>
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={Boolean(formik.errors.username && formik.touched.username)}
        >
          <FormLabel> Username </FormLabel>
          <Input
            type="text"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.email && formik.touched.email)}
        >
          <FormLabel> Email </FormLabel>
          <Input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(formik.errors.password && formik.touched.password)}
        >
          <FormLabel> Password </FormLabel>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(
            formik.errors.confirmPassword && formik.touched.confirmPassword
          )}
        >
          <FormLabel> Confirm Password </FormLabel>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={showConfirm ? "text" : "password"}
              placeholder="Enter Confirm password"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <Center mt="40px">
          <Button type="submit" variant="solid">
            Register
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CardRegister;
