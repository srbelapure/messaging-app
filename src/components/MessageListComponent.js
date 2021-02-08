import React from "react";

const MessageListComponent = ({ messagesList }) => {
  return (
    <div className="content-section">
      {messagesList.map((item) => {
        return (
          <div key={item.id} className="individual-user-message-section">
            <span className="message-user-name">{item.uname}:</span>
            <span className="message-received-from-user-name">{item.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageListComponent;
