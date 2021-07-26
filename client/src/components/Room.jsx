import { Box, Flex, Heading, IconButton, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
// import {GrSend} from 'react-icons/gr'
const socket = io.connect("http://localhost:8000/");

const Room = () => {
  const [online, setOnline] = useState(0);
  const { room } = useParams();
  useEffect(() => {
    socket.emit("joinRoom", room);
    socket.on("number", (number) => {
      setOnline(number);
    });

    return () => {
      socket.emit("unsub", room);
    };
  }, [room]);
  return (
    <Box p="1rem" h="100vh" position="relative">
      <Heading size="md" textTransform="capitalize">
        {room} Online: {online}
      </Heading>
      <Flex position="absolute" bottom="1rem" w="95%" mx="auto">
        <Input />
        <IconButton ml="1rem"  />
      </Flex>
    </Box>
  );
};

export default Room;
