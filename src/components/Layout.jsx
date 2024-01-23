import { Container } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Container maxW="7xl" display="flex">
      <Sidebar />

      {children}
    </Container>
  );
};

export default Layout;
