import { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Flex, Box} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RoomsContainer from './RoomsContainer'
import HomePage from "./HomePage";
import Room from "./Room";
import Join from "./Join";
import io from "socket.io-client";
const socket = io.connect("https://chatroomonline-server.herokuapp.com/");
// const socket = io.connect("http://localhost:8000/");
const App = () => {
  
  const [user, setUser] = useState("");
  
  useEffect(()=>{
    const localUsername = localStorage.getItem('username');
    if (localUsername) setUser(localUsername)
  },[])
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Flex h="100vh" overflow="hidden">
          <RoomsContainer socket={socket} />
          <Box w="100%" h="100vh" overflow="auto">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/rooms/:room">
                <Room socket={socket} />
              </Route>
            </Switch>
          </Box>
        </Flex>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
