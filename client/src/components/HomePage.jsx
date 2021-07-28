import { Flex, Heading, IconButton, Input, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [inputUsername, setInputUsername] = useState("");
  const history = useHistory();
  const [error, setError] = useState("");
  const setUsername = () => {
    if (inputUsername.trim().length >= 20 || inputUsername.trim().length === 0)
      return setError("Usernames must be between 1 to 20 in length.");
    setUser(inputUsername);
    localStorage.setItem("username", inputUsername);
    history.push("/join");
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
      <Flex alignItems="center" position="relative">
        <Input
          w="17rem"
          placeholder="Set Username"
          mb="1rem"
          mr="0.7rem"
          value={inputUsername}
          onChange={(e) => {
            setInputUsername(e.target.value);
          }}
        ></Input>

        <IconButton
          size="sm"
          colorScheme="teal"
          onClick={setUsername}
          mb="0.8rem"
          icon={<BsArrowRight style={{ fontSize: "1.5rem" }} />}
        />
        <Text
          fontSize="0.8rem"
          left="50%"
          transform="translateX(-50%)"
          w="max-content"
          color="red"
          position="absolute"
          bottom="-1rem"
        >
          {error}
        </Text>
      </Flex>
    </Flex>
  );
};

export default HomePage;
