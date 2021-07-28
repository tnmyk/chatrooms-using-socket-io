import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Join = () => {
  const [roomInput, setRoomInput] = useState("");
  const [error, setError] = useState("");
  const history = useHistory()
  const joinRoom = () => {
    if (roomInput.trim().length === 0)
      return setError("Please enter a room name or join public");
    if (roomInput.trim().length >20){
      return setError("Room name must be less than 20 in length");

    }
    history.push("/rooms/" + roomInput);
  };
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
        placeholder="Custom room name (1-20 in length)"
        mt="2rem"
        w="20rem"
        maxLength='20'
        value={roomInput}
        onChange={(e) => {
          setRoomInput(e.target.value);
        }}
      />
      <Button mt="2rem" onClick={joinRoom}>
        Join {roomInput}
      </Button>
      <Text mt='1rem' color='red'>{error}</Text>
    </Flex>
  );
};

export default Join;
