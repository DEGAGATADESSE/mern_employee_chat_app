// Returns the name of the sender who is not the logged-in user
export const getSender = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return "";
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

// Returns the full details of the sender who is not the logged-in user
export const getSenderFull = (loggedUser, users) => {
  if (!loggedUser || !users || users.length < 2) return null;
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

// Checks if the current message is sent by a different user than the next message or is the last message
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    messages[i + 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
  );
};

// Checks if the message is the last one in the chat and sent by a different user than the logged-in user
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId
  );
};

// Determines the margin for the sender's avatar based on the messages array
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

// Checks if the previous message is sent by the same user
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
