import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      p="1rem"
      h="100vh"
      position="relative"
    >
      <Heading>Join a room</Heading>
      <Link to="rooms/public">
        <Button>Join Public</Button>
      </Link>
    </Flex>
  );
};

export default Join;
