import { Box , Flex , Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const sidebarItems =[
    {name: "Home", url: '/'},
    {name: "Notifications", url: '/notifications' },
    {name: "Messages", url: '/messages'},
    {name: "Profile", url: '/profile'},
]

const Sidebar = () => {
    const navigate = useNavigate()
  return (
    <Box h="full">
      {sidebarItems.map((item, index) => {
        return  (
            <Flex key={index} py='4' marginRight='12' onClick={() => navigate(item.url)} cursor='pointer'>
                <Text fontSize='30px'>
                    {item.name}
                </Text>
            </Flex>
        )
      } )}
    </Box>
  );
};

export default Sidebar;
