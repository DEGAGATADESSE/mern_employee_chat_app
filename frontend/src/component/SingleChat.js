import React, { useState, useEffect } from 'react';
import { ChatState } from "../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/layout";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton, Button, Input, useToast, FormControl, Spinner } from "@chakra-ui/react";
import axios from "axios";
import "./styles.css";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { getSender, getSenderFull } from '../config/ChatLogics';

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();
  const toast = useToast();
  const [socketConnected, setSocketConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  const postDetails = async (files) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dpma5mmyy");
      const response = await fetch("https://api.cloudinary.com/v1_1/dpma5mmyy/image/upload", {
        method: "post",
        body: data,
      });
      const fileData = await response.json();
      setLoading(false);
      return fileData.url.toString();
    } catch (error) {
      console.log(files);
      setLoading(false);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!newMessage && !file) return;

    socket.emit('stop typing', selectedChat._id);
    try {
      let fileUrl = null;
      if (file) {
        fileUrl = await postDetails(file);
        if (!fileUrl) return; // If upload fails, do not proceed
      }

      const messageData = {
        chatId: selectedChat._id,
        content: newMessage,
        file: fileUrl,
      };

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setNewMessage("");
      setFile(null);

      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        messageData,
        config
      );

      socket.emit('new message', data);
      setMessages([...messages, data]);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Failed to send the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
    // eslint-disable-next-line
  }, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div height={{ base: "calc(100vh - 50px)", md: "calc(100vh - 100px)" }}
    overflowY="scroll">
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            overflowX="auto"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  setMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowX="auto"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
<FormControl id="message-input" isRequired mt={3} alignContent="end">
  {isTyping && (
    <div>
      <Lottie
        options={defaultOptions}
        width={70}
        style={{ marginBottom: 15, marginLeft: 0 }}
      />
    </div>
  )}
  <Box display="flex" alignItems="center" backgroundColor="white" >
    <Input
      variant="filled"
      bg="#E0E0E0"
      placeholder="Enter a message.."
      value={newMessage}
      onChange={typingHandler}
    
    />
    <Input
      type="file"
      accept="image/*,.pdf"
      onChange={handleFileChange}
      ml={2}
    
    />
    <Button backgroundColor="blue" color="white"onClick={sendMessage} ml={2} flex="0 0 auto">
      Send
    </Button>
  </Box>
</FormControl>

          </Box>
        </>
      ) : (
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work Sans">
            Click on a user to start chat
          </Text>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;
