import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [roomInput, setRoomInput] = useState("");
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
        <Button mt="10rem">Join Public</Button>
      </Link>
      <Heading fontSize="sm" mt="2rem" textAlign="center">
        Or <br /> create a room{" "}
      </Heading>
      <Input
        placeholder="Custom room name"
        mt="2rem"
        w="20rem"
        value={roomInput}
        onChange={(e) => {
          setRoomInput(e.target.value);
        }}
      />
      <Link to={"rooms/"+roomInput}>
        <Button mt="2rem">Join {roomInput}</Button>
      </Link>
    </Flex>
  );
};

export default Join;
