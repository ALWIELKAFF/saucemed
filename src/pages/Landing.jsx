import CardTextArea from "../components/CardTextArea";
import { Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { baseUrl } from "../utils/config";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Cardtweet from "../components/CardTweet";

const Landing = () => {
  const [tweets, setTweets] = useState([]);
  console.log(tweets);
  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl + "/tweets?_expand=user&_sort=id&_order=desc"
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <Layout>
      <Grid w="full" templateColumns="repeat(5, 1fr)" gap={8}>
        <GridItem colSpan="4" w="100%" h="10">
          <CardTextArea getTweets={getTweets} />
          {tweets.map((tweet) => {
            return (
              <Cardtweet key={tweet.id} data={tweet} getTweets={getTweets} />
            );
          })}
        </GridItem>
        <GridItem colSpan="1" w="100%" h="10">
          Find people to follow
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Landing;
