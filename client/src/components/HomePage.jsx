import { Flex, Text, Heading, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Heading size="3xl">Room Chats</Heading>
      <Text mb="3rem">Most secure Room chats with no saved histories.</Text>
      <Input w="30%" placeholder="Set Username" mb="1rem"></Input>
      <Link to='rooms/public'>
        <Button>Join Public</Button>
      </Link>
    </Flex>
  );
};

export default HomePage;
