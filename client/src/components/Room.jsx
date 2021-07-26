import { Box, Flex, IconButton, Input, Tag, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { UserContext } from "../contexts/UserContext";
import Message from "./Message";
import UsersChange from "./UsersChange";
const socket = io.connect("http://localhost:8000/");

const Room = () => {
  const [msgInput, setMsgInput] = useState("");
  const [online, setOnline] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const noti = new Audio('/notification.mp3')
  const { room } = useParams();
  const { user: username } = useContext(UserContext);
  const time = "69:69:69";
  const sendMsg = () => {
    
    socket.emit("message", {
      room: room,
      messageData: {
        type: "text",
        message: msgInput,
        username: username,
        time: time,
      },
    });
    setMsgInput("");
  };
  useEffect(() => {
    
    socket.emit("joinRoom",{room: room,username:username});
    socket.on("number", (number) => {
      setOnline(number);
    });
    socket.on("newMessage", (newMessage) => {
      new Audio("/notification.mp3").play();
      setMsgs((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.emit("unsub", { room: room, username: username });
    };
  }, [room]);
  return (
    <Box p="1rem" h="100vh" position="relative">
      {/* <Heading size="sm" textTransform="capitalize"></Heading> */}
      <Flex alignItems="center">
        <Text fontSize="0.9rem">Current room: </Text>{" "}
        <Text
          textTransform="capitalize"
          ml="0.3rem"
          mr="1rem"
          fontSize="0.9rem"
          fontWeight="medium"
        >
          {room}
        </Text>
        <Tag size="sm" variant="solid" colorScheme="teal">
          Online: {online}
        </Tag>
      </Flex>
      <Flex
        flexDir="column"
        w="98%"
        p="1rem"
        mt="0.6rem"
        backgroundColor="gray.900"
        position="relative"
        h="80vh"
        overflow="auto"
        alignItems="flex-start"
        borderRadius="8px"
      >
        {msgs.map((msgData) => {
          if(msgData.type==='userschange')
          return <UsersChange key={Math.random()} msgData={msgData} />
          // return <h1 key={Math.random()}>someoneleft - {msgData.username}</h1>
          return (
            <Message
              message={msgData.message}
              username={msgData.username}
              time={msgData.time}
              key={Math.random()}
            />
          );
        })}
      </Flex>

      <Flex position="absolute" bottom="1rem" w="96%" mx="auto">
        <Input
          colorScheme="teal"
          value={msgInput}
          onChange={(e) => {
            setMsgInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMsg();
          }}
        />
        <IconButton ml="1rem" icon={<AiOutlineSend />} onClick={sendMsg} />
      </Flex>
    </Box>
  );
};

export default Room;
