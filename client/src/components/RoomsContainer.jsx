import { Box, Button, color, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdPersonOutline } from "react-icons/md";
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
    <Flex
      w="11.5rem"
      flexDir="column"
      background="gray.900"
      overflow="auto"
      borderRight="1px solid #282b38"
      h="100vh"
      alignItems="center"
    >
      {" "}
      <Link to="/">
        <Button
          mt="0.7rem"
          h="2rem"
          colorScheme="gray"
          fontWeight="700"
          // letterSpacing='1px'
          fontSize="0.95rem"
          backgroundColor="blue.900"
        >
          Dashboard
        </Button>
      </Link>
      <Heading color="#BDBDBD" fontWeight="400" fontSize="0.83rem" mt="1.5rem">
        Rooms
      </Heading>
      <Box w="100%" px="1rem">
        {roomsList.length===0 && <Box mt='1rem' mx='auto'
          style={{
            fontSize: "0.65rem",
            textTransform: "capitalize",
            width:'max-content',
            maxWidth: "6.5rem",
            whiteSpace: "nowrap",
            color:"#BDBDBD" 
            
          }}
        >
          no room active yet
        </Box>}
        {roomsList.map((room) => {
          return (
            <Flex
              mt="1rem"
              justifyContent="space-between"
              alignItems="center"
              key={Math.random()}
            >
              <Box
                style={{
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  maxWidth: "5.5rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {room.name}
              </Box>
              <Flex style={{ fontSize: "0.70rem" }}>
                <MdPersonOutline style={{ fontSize: "0.9rem" }} /> {room.number}
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Flex>
  );
};

export default RoomsContainer;
