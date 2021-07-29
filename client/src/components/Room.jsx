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

import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSend, AiOutlinePicture } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { UserContext } from "../contexts/UserContext";
import Message from "./Message";
import UsersChange from "./UsersChange";
import audio from "../assets/notification.mp3";
import UsersContainer from "./UsersContainer";

const Room = ({ socket }) => {
  const inputMedia = useRef(null);
  const [msgInput, setMsgInput] = useState("");
  const [online, setOnline] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const history = useHistory();
  const { room } = useParams();
  const { user: username } = useContext(UserContext);
  const [timeout, setTimeout] = useState(0);
  const [mediaData, setMediaData] = useState();
  const setMedia = () => {
    const reader = new FileReader();
    reader.onload = function () {
      setMediaData(this.result);
    };
    reader.readAsDataURL(inputMedia.current.files[0]);
  };

  const sendMsg = () => {
    if ((msgInput.trim() === "" && !mediaData) || timeout > 0) return;

    let x = 2;
    setTimeout(x);
    const interval = setInterval(() => {
      setTimeout((prev) => prev - 0.1);
      x -= 0.1;
      if (x < 0) clearInterval(interval);
    }, 100);
    if (!mediaData) {
      socket.emit("message", {
        room: room,
        messageData: {
          type: "text",
          message: msgInput,
          // message:timeout,
          username: username,
          time: new Date().toLocaleString("en-IN"),
        },
      });
    } else {
      socket.emit("message", {
        room: room,
        messageData: {
          type: "textimage",
          message: msgInput,
          image: mediaData,
          username: username,
          time: new Date().toLocaleString("en-IN"),
        },
      });
    }
    setMediaData(null);
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
    <Box h="100vh" position="relative" backgroundColor="gray.900">
      <Flex
        alignItems="center"
        backgroundColor="black"
        w="100%"
        h="3rem"
        p="1rem"
      >
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

      <Flex h="calc(100vh - 3rem)">
        <Flex
          flexDir="column"
          w="90%"
          p="1rem"
          // mt="0.6rem"
          backgroundColor="gray.900"
          position="relative"
          h="80vh"
          overflow="auto"
          alignItems="flex-start"
          // borderRadius="8px"
        >
          {msgs.map((msgData) => {
            if (msgData.type === "userschange")
              return <UsersChange key={Math.random()} msgData={msgData} />;
            return (
              <Message
                message={msgData.message}
                username={msgData.username}
                time={msgData.time}
                key={Math.random()}
                image={msgData.image}
              />
            );
          })}
        </Flex>
        <UsersContainer socket={socket} />
      </Flex>
      <Flex px="1rem" position="absolute" bottom="1rem" w="83%" mx="auto">
        <InputGroup>
          <Input
            placeholder="Enter text or send images..."
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
          <InputRightAddon
            children={
              timeout > 0 ? timeout.toFixed(2) : msgInput.length + `/400`
            }
          />
        </InputGroup>
        {mediaData ? (
          <IconButton
            backgroundColor="red.500"
            _hover={{ backgroundColor: "red.600" }}
            ml="0.5rem"
            icon={
              <FiPlus
                style={{ fontSize: "1.6rem", transform: "rotateZ(45deg)" }}
              />
            }
            onClick={() => {
              setMediaData(null);
              inputMedia.current.value=null
            }}
          />
        ) : (
          <IconButton
            colorScheme="blue"
            ml="0.5rem"
            icon={<AiOutlinePicture />}
            onClick={() => {
              inputMedia.current.click();
            }}
          />
        )}
        <IconButton ml="0.5rem" icon={<AiOutlineSend />} onClick={sendMsg} />
        <input
          ref={inputMedia}
          onChange={setMedia}
          type="file"
          name="media"
          id=""
          style={{ display: "none" }}
          accept="image/*"
        />
      </Flex>
    </Box>
  );
};

export default Room;
