import { IconButton } from "@chakra-ui/react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
const Mute = ({ mute, setMute }) => {
  
  const changeMute =()=>{
      localStorage.setItem('mute',!mute);
      setMute(prev=>!prev);
  }
    return (
    <IconButton
      onClick={changeMute}
      icon={mute ? <BiVolumeMute /> :<BiVolumeFull /> }
    />
  );
};

export default Mute;
