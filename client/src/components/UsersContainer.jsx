import { Heading, VStack, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const UsersContainer = ({ socket }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    socket.on("usersInRoom", (usersInRoom) => {
      console.log(usersInRoom);
      setUsers(usersInRoom)
    });
  }, []);

  return (
    <VStack
      w="8rem"
      backgroundColor='gray.700'
      // background="gray.900"
      overflow="auto"
      h='calc(100%)'
      spacing="0.5rem"
    >
      {" "}
      <Heading fontSize="1.3rem" my="1rem" mt="3rem">
        Users
      </Heading>
      {users.map((user) => {
          return (
            <Flex alignItems="center" key={Math.random()}>
              {user}
              {/* <span
                style={{
                  backgroundColor: "teal",
                  marginLeft: "0.5rem",
                  padding: "0.1rem 0.3rem",
                  borderRadius: "5px",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  height: "max-content",
                }}
              >
                {room.number}
              </span> */}
            </Flex>
          );
        })}
    </VStack>
  );
};

export default UsersContainer;
