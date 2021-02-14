import React from "react";
import {ThemeContext} from './MainComponentWithHooks'

const MessageListComponent = ({ messagesList }) => {
  const { theme} = React.useContext(ThemeContext);
  return (
    <div className="content-section" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
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
