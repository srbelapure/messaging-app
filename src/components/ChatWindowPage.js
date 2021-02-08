import React from "react";
import TitleComponent from "./TitleComponent";
import MessageListComponent from "./MessageListComponent";
import SendMessageFromComponent from "./SendMessageFromComponent";

const ChatWindowPage = ({ messagesList,sendMessageToConversation }) => {
  // React.useEffect(
  //   () => { fetchMessages()},[]
  // );
  return (
    <React.Fragment>
      <TitleComponent appTitle="FriendsHangoutApp" />
      <MessageListComponent messagesList={messagesList} />
      <SendMessageFromComponent 
      sendMessageToConversation={sendMessageToConversation} 
      />
    </React.Fragment>
  );
};

export default ChatWindowPage;
