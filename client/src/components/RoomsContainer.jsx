import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RoomsContainer = ({ socket }) => {
  const [roomsList, setRoomsList] = useState([]);
  useEffect(() => {
    socket.on("rooms", (rooms) => {
      const newroom = Object.keys(rooms)
        .map((key) => {
          return { name: key, number: rooms[key] };
        })
        .sort(function (a, b) {
          var keyA = a.number,
            keyB = b.number;
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
      setRoomsList(newroom);
    });
  }, [socket]);

  return (
    <VStack
      w="10rem"
      background="gray.900"
      overflow="auto"
    
      h="100vh"
      spacing="0.5rem"
    >
      {" "}
      <Link to="/">Home</Link>
      <Heading fontSize="1.3rem" my="1rem" mt="3rem">
        Rooms
      </Heading>
      {roomsList.map((room) => {
        return (
          <Flex alignItems='center' key={Math.random()}>
            {room.name}
            <span
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
            </span>
          </Flex>
        );
      })}
    </VStack>
  );
};

export default RoomsContainer;
