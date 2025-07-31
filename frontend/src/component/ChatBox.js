import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="watermark"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
      marginLeft={50}
      height={{ base: "calc(100vh - 50px)", md: "calc(100vh - 100px)" }}
      overflowY="scroll"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
    </Box>
  );
};

export default Chatbox;
