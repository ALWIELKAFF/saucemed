import { Container, Box, Text, ButtonGroup, Button, MenuButton, MenuList, MenuItem ,Menu } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaPepperHot } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/slice/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state)=> state.user);

  const handleLogout = () => {
    localStorage.removeItem('saucemed_app')
    dispatch(logoutAction())
    navigate("/")
  }

  return (
    <Box shadow="sm">
      <Container
        maxW="7xl"
        border="1px solid white"
        py="3"
        display="flex"
        justifyContent="space-between"
      >
        <Link to="/">
        <Text fontSize="26px" display="flex">
          {" "}
          SauceMed <FaPepperHot size="40px" />
        </Text>
        </Link>

        {
            user.id ? ( <Menu>
            <MenuButton >{user.username}</MenuButton>
            <MenuList>
              <Link to={`/profile/${user.id}`}>
              <MenuItem>Profile</MenuItem>
              </Link>
              <Link to={"/"}>
              <MenuItem>home</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
          ):( <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
          <Button variant="solid" onClick={() => navigate("/register")}>
            REGISTER
          </Button>
        </ButtonGroup>
        )}

        
      </Container>
    </Box>
  );
};

export default Navbar;
