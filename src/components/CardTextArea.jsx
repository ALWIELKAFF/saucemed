import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../utils/config"
import { useSelector } from "react-redux"

const CardTextArea = ({ getTweets }) => {
  const user = useSelector((state) => state.user )
  const [tweet, setTweet] = useState('')
    async function handleTweet() {
    try {
      await axios.post(baseUrl + `/tweets`, {
        tweet: tweet,
        userId: user.id,
        createdAt: new Date(),
      })

    } catch (error) {
      console.log(error)

    } finally {
      getTweets();
    }
  }
  return (
    <Box mt={7} px={7}>
        <Flex gap={8} alignItems='center'>
        <Avatar bg='teal.500' size='xl' />
        <Textarea onChange={(e) => setTweet(e.target.value)} maxLength={200} />
        </Flex>
        <Text textAlign="end">
        {tweet.length}/200
        </Text>
        <Flex justifyContent='end'>
            <Button onClick={handleTweet}>
                Share
            </Button>
        </Flex>
    </Box>
  )
}

export default CardTextArea