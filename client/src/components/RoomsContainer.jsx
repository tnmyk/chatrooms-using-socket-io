import { Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const RoomsContainer = () => {
  return (
    <VStack
      w="10rem"
      background="gray.900"
      overflow="auto"
      h="100vh"
      spacing="0.5rem"
    >
      {" "}
      <Link to="/">Home</Link>
      <Heading fontSize="1.3rem" my="1rem" mt="3rem">
        Rooms
      </Heading>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
      <Text>dasdasasd</Text>
    </VStack>
  );
};

export default RoomsContainer;
