import { Heading, Flex, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UsersContainer = ({ socket }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("usersInRoom", (usersInRoom) => {
      setUsers(usersInRoom);
    });
  }, [socket]);

  return (
    <Flex
      w="12rem"
      flexDir="column"
      background="gray.900"
      overflow="auto"
      borderLeft="1px solid #282b38"
      h="100%"
      alignItems="center"
    >
      {" "}
      <Heading
        mb="1.2rem"
        color="#BDBDBD"
        fontWeight="400"
        fontSize="0.83rem"
        mt="1.5rem"
      >
        <Flex alignItems="center">
          <span>Active</span>
          <span
            style={{
              marginLeft: "0.3rem",
              display: "inline-flex",
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "#4ACA73",
            }}
          ></span>
        </Flex>
      </Heading>
      <Box w="100%" px="1rem">
        {users.map((user) => {
          return (
            <Flex
              fontSize="0.93rem"
              mb="0.5rem"
              alignItems="center"
              key={Math.random()}
            >
              {user}
            </Flex>
          );
        })}{" "}
      </Box>
    </Flex>
  );
};

export default UsersContainer;
