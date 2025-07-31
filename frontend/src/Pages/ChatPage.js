import {  Flex } from "@chakra-ui/layout";
import Chatbox from "../component/ChatBox";
import MyChats from "../component/MyChats";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../component/miscellaneous/SideDrawer";
import { useState } from "react";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}  
      <Flex justify="space-between" w="125%" h="91.5vh" p="10px" >
        {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        {user && (
          <Flex  w="100%">
            <Chatbox  fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
            
          </Flex>
        )}
      </Flex>
    </div>
  );
};

export default Chatpage;