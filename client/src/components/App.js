import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Flex, Box} from "@chakra-ui/react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import RoomsContainer from './RoomsContainer'
import HomePage from "./HomePage";
const App = () => {
  const [user, setUser] = useState("tnasadasd");

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Flex h="100vh" overflow="hidden">
          <RoomsContainer />
          <Box w='100%' h="100vh" overflow='auto'>
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </Box>
        </Flex>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
