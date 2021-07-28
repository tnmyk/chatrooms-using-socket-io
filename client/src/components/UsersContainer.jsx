import { Heading, VStack,Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const UsersContainer = () => {
    
    
    return (
      <VStack
        w="10rem"
        background="gray.900"
        overflow="auto"
        h="100vh"
        spacing="0.5rem"
      >
        {" "}
        <Heading fontSize="1.3rem" my="1rem" mt="3rem">
          Users
        </Heading>
        {roomsList.map((room) => {
          return (
            <Flex alignItems="center" key={Math.random()}>
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
}
 
export default UsersContainer;