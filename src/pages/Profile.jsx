import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import Cardtweet from "../components/Cardtweet";


const Profile = () => {
  const user = useSelector((state) => state.user);
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState("");
  console.log(tweet);

  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/tweets?userId=${user.id}&_expand=user&_sort=id&_order=desc`
      );

      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTweet = async () => {
    try {
      await axios.post(baseUrl + `/tweets`, {
        tweet: tweet,
      userId:user.id,
      createdAt: new Date(),
    
      });
      setTweet("")
    } catch (error) {
      console.log(error)
    }
    finally {
      getTweets()
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <Layout>
      <Box w="full">
        <Image w="full" h="200px" src="/bgimagos.avif" />
        <Box px="4">
          <Avatar name="alfa" size="lg" mt="-10" />
          <Flex justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontWeight="bold" fontSize="xx-large">
                {" "}
                @{user.username}{" "}
              </Text>
              <Text fontSize="18px"> {user.email} </Text>
            </Flex>
            <Button> Edit </Button>
          </Flex>

          {/* TEXTAREA */}
          <Textarea onChange={(e) => setTweet(e.target.value)} value={tweet} />
          <Flex justifyContent="end" my="4">
            <Button onClick={handleTweet}>Share</Button>
          </Flex>
        </Box>
        <Box>
          {tweets.map((tweet) => {
            return (
              <Cardtweet key={tweet.id} data={tweet} getTweets={getTweets} />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
