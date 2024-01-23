import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputRightElement,
  Text,
  Toast,
  position,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaPepperHot } from "react-icons/fa";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { InputGroup } from "@chakra-ui/react";
import * as yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/config";
import { loginAction } from "../redux/slice/userSlice";
YupPassword(yup);

const validationSchema = yup.object().shape({
  usernameOrEmail: yup.string().required("Username and Email cannot be empty"),
  password: yup.string().required("Password cannot be empty").min(6),
});

const CardLogin = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const isEmail = values.usernameOrEmail.includes("@");
      try {
        // let userData;

        // if (isEmail) {
        //   userData = await axios.get(
        //     baseUrl +
        //       `/users?email=${values.usernameOrEmail}&password=${values.password}`
        //   );
        // } else {
        //   userData = await axios.get(
        //     baseUrl +
        //       `/users?username=${values.usernameOrEmail}&password=${values.password}`
        //   );
        // }

        const {data} = await axios.post(baseUrl + `/users/login`, {
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        });
        console.log(data);
        // if (!userData.data.length) return alert("Invalid Username or password");

        localStorage.setItem("saucemed_app", JSON.stringify(data));
        dispatch(loginAction(data.data));

        toast({
          title: "Login Success",
          status: "success",
          duration: 1500,
          isClosable: true,
          position: "top-right",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
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
  return (
    <Box
      w="400px"
      shadow="dark-lg"
      p="8"
      rounded="xl"
      pb="12"
      pt="10"
      justifyContent="center"
    >
      <Text
        fontSize="42px"
        fontWeight="bold"
        display="flex"
        justifyContent="space-evenly"
        pb="6"
      >
        Sign in <FaPepperHot size="70px" />
      </Text>
      <Text>
        Not have account ?
        <Text display="inline" color="yellow.500">
          <Link to="/register"> Register Now</Link>
        </Text>
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          isInvalid={Boolean(
            formik.errors.usernameOrEmail && formik.touched.usernameOrEmail
          )}
        >
          <FormLabel> Username / Email </FormLabel>
          <Input
            type="text"
            name="usernameOrEmail"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usernameOrEmail}
          />
          <FormErrorMessage>{formik.errors.usernameOrEmail}</FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={Boolean(
            formik.errors.usernameOrEmail && formik.touched.password
          )}
        >
          <FormLabel> Password </FormLabel>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <Center mt="40px">
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </Center>
      </form>
    </Box>
  );
};

export default CardLogin;
