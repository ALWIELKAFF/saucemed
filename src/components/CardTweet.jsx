import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { IoEllipsisVerticalCircleSharp } from "react-icons/io5";
import { baseUrl } from "../utils/config";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cardtweet = ({ data, getTweets }) => {
  const user = useSelector((state) => state.user);
  const date = formatDistance(new Date(data.createdAt), new Date(), {
    addSuffix: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tweet, setTweet] = useState(data.tweet);

  const handleDelete = async () => {
    try {
      await axios.delete(baseUrl + `/tweets/${data.id}`);
      alert("Delete Success");
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(baseUrl + `/tweets/${data.id}`, {
        tweet: tweet,
      });
      onClose();
      alert("Edit Success");
    } catch (error) {
    } finally {
      getTweets();
    }
  };

  return (
    <Box px="4" shadow="sm" h="130px">
      <Flex gap="4" alignItems="center" mb="5" justifyContent="space-between">
        <Flex gap="4" alignItems="center">
          <Link to={`/profile/${data.user.id}`}>
            <Avatar />
          </Link>

          <Text fontSize="20px" fontWeight="bold" px="5">
            @{data.user.username}
          </Text>
          <Text py="1">{date}</Text>
        </Flex>
        {user.id === data.user.id ? (
          <Menu>
            <MenuButton>
              <IoEllipsisVerticalCircleSharp size="30px" />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={onOpen}> Edit </MenuItem>
                <MenuItem onClick={handleDelete}> Delete </MenuItem>
                <MenuItem> Report </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        ) : null}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                onChange={(e) => setTweet(e.target.value)}
                value={tweet}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleEdit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Text fontSize="17px">{data.tweet}</Text>
    </Box>
  );
};

export default Cardtweet;
