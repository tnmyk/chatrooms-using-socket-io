import { Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const setUsername = () => {
    setUser(inputUsername);
    localStorage.setItem("username", inputUsername);
  };
  useEffect(() => {
    if (user) setInputUsername(user);
  }, [user]);
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Heading size="3xl">Room Chats</Heading>
      <Text mb="3rem">Most secure Room chats with no saved histories.</Text>
      <Flex w="30%" alignItems="center">
        <Input
          w="80%"
          placeholder="Set Username"
          mb="1rem"
          mr="0.7rem"
          value={inputUsername}
          onChange={(e) => {
            setInputUsername(e.target.value);
          }}
        ></Input>
        <Link to="/join">
          <IconButton
            size="sm"
            colorScheme="teal"
            onClick={setUsername}
            mb="0.8rem"
            icon={<BsArrowRight style={{ fontSize: "1.5rem" }} />}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default HomePage;
