import React,{useEffect,useState} from "react";
import {ThemeContext} from '../App'
import { getAuth } from "firebase/auth";

const MessageListComponent = ({ messagesList,userDetails }) => {
  const { theme,dark} = React.useContext(ThemeContext);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    if (
      getAuth() &&
      getAuth().currentUser &&
      getAuth().currentUser.displayName
    ) {
      setCurrentUser(getAuth().currentUser.displayName);
    }
  }, [currentUser]);

  return (
    <div className={dark ?"content-section-dark-theme" : "content-section"} style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      {messagesList.length>0 && messagesList.map((item) => {
        if (item.post.uname === currentUser) {
          return (
            <div key={item.post.id} className={dark ? "individual-user-message-section-current-user-dark-theme" : "individual-user-message-section-current-user"}>
              <span className="message-user-name-current">{"You"}</span>
              <span className="message-received-from-user-name">{item.post.message}</span>
            </div>
          );
        }
        else{
          let colorCodeWarm,colorcodeLight;
          if(userDetails.length>0){
            userDetails.map((userDetail)=>{
              if(userDetail.post.uid === item.post.uid){
                colorCodeWarm = userDetail.post.warmcolorcode
                colorcodeLight = userDetail.post.lightcolorcode
              }
            })
          }
          return (
            <div key={item.post.id} className={dark ?"individual-user-message-section-dark-theme" : "individual-user-message-section"}>
              <span className="message-user-name" 
              style={dark ? {color:`${colorCodeWarm}`}:{color:`${colorcodeLight}`}}
              >
                {item.post.uname}
                </span>
              <span className="message-received-from-user-name">{item.post.message}</span>
            </div>
          );
        }
      })}
    </div>
  ); 
};

export default MessageListComponent;
