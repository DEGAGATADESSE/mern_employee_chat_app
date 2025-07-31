import React from 'react';
import { Avatar } from "@chakra-ui/avatar";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from "../Context/ChatProvider";
import { Tooltip } from "@chakra-ui/tooltip";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const renderFile = (message) => {
    if (message.file) {
      const fileExtension = message.file.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        return <img src={message.file} alt="sent file" style={{ maxWidth: '50%', borderRadius: '10px', marginTop: '10px' }} />;
      } else if (['pdf', 'doc','ppt','txt'].includes(fileExtension)) {
        return <a href={message.file} target="_blank" rel="noopener noreferrer" style={{ maxWidth:'20%', maxHeight:'30vh',color: 'white', textDecoration: 'underline' }}>View File</a>;
      }
    }
    return null;
  };

  return (
    <ScrollableFeed overflowX="auto"> 
      {messages && messages.map((m, i) => (
        <div style={{ display: "flex" }} key={m._id}>
          {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              <Avatar
                mt="10px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.pic}
              />
            </Tooltip>
          )}
          <span style={{
            backgroundColor: `${m.sender._id === user._id ? "blue" : "black"}`,
            color: "white",
            borderRadius: "20px",
            padding: "5px 15px",
            maxWidth: "75%",
            marginLeft: isSameSenderMargin(messages, m, i, user._id),
            marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
          }}>
            {m.content}
            {renderFile(m)}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
