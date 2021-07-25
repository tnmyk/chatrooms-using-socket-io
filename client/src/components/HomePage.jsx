import { Flex, Text, Heading, Input } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Heading>Room Chats</Heading>
      <Input w="30%" placeholder="Set Username"></Input>
      <Text>Most secure Room chats with no saved histories.</Text>
    </Flex>
  );
};

export default HomePage;
