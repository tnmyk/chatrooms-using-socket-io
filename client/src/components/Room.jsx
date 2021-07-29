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
import { AiOutlineSend, AiOutlineFile } from "react-icons/ai";
import { useHistory, useParams } from "react-router-dom";

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

  const sendMedia = (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      socket.emit("message", {
        room: room,
        messageData: {
          type: "image",
          message: this.result,
          // message:timeout,
          username: username,
          time: new Date().toLocaleString("en-IN"),
        },
      });
    };
    reader.readAsDataURL(inputMedia.current.files[0]);
  };

  const sendMsg = () => {
    if (msgInput.trim() === "" || timeout > 0) return;
    
    let x = 3;
    setTimeout(x);
    const interval = setInterval(() => {
      setTimeout((prev) => prev - 0.1);
      x -= 0.1;
      if (x < 0) clearInterval(interval);
    }, 100);
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
    setMsgInput("");
  };

  // useEffect(()=>{
  //   if(timeout<0) console.log('lol')
  //   // clearInterval(interval)
  // },[timeout])

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
            else if (msgData.type === "image") {
              return <img src={msgData.message} alt="" />;
            }

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
        <UsersContainer socket={socket} />
      </Flex>
      <Flex px="1rem" position="absolute" bottom="1rem" w="83%" mx="auto">
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
          <InputRightAddon
            children={timeout > 0 ? timeout.toFixed(2) : msgInput.length + `/400`}
          />
        </InputGroup>
        <IconButton
          colorScheme="blue"
          ml="0.5rem"
          icon={<AiOutlineFile />}
          onClick={() => {
            inputMedia.current.click();
          }}
        />
        <IconButton ml="0.5rem" icon={<AiOutlineSend />} onClick={sendMsg} />
        <input
          ref={inputMedia}
          onChange={sendMedia}
          type="file"
          name="media"
          id=""
          style={{ display: "none" }}
        />
      </Flex>
    </Box>
  );
};

export default Room;
