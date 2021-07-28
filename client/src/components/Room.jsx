import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import Message from "./Message";
import UsersChange from "./UsersChange";
import audio from "../assets/notification.mp3";

const Room = ({ socket }) => {
  const [msgInput, setMsgInput] = useState("");
  const [online, setOnline] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const history = useHistory();
  const { room } = useParams();
  const { user: username } = useContext(UserContext);

  const sendMsg = () => {
    if (msgInput.trim() === "") return;
    socket.emit("message", {
      room: room,
      messageData: {
        type: "text",
        message: msgInput,
        username: username,
        time: new Date().toLocaleString("en-IN"),
      },
    });
    setMsgInput("");
  };
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      history.push("/");
      return window.alert("Set a username first.");
    }
    socket.emit("joinRoom", {
      room: room,
      username: localStorage.getItem("username"),
    });
    socket.on("number", (number) => {
      setOnline(number);
    });
    socket.on("newMessage", (newMessage) => {
      new Audio(audio).play().catch((err) => {});
      setMsgs((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.emit("unsub", { room: room, username: username });
    };
    // eslint-disable-next-line
  }, [room]);
  return (
    <Box p="1rem" h="100vh" position="relative">
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
          if (msgData.type === "userschange")
            return <UsersChange key={Math.random()} msgData={msgData} />;
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
        <InputGroup>
          <Input
            colorScheme="teal"
            value={msgInput}
            maxLength="400"
            onChange={(e) => {
              setMsgInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMsg();
            }}
          />
          <InputRightAddon children={msgInput.length + `/400`} />{" "}
        </InputGroup>
        <IconButton ml="1rem" icon={<AiOutlineSend />} onClick={sendMsg} />
      </Flex>
    </Box>
  );
};

export default Room;
