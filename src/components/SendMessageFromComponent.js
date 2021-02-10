import React from 'react';
import { v4 as uuidv4 } from "uuid";

const SendMessageFromComponent =({sendMessageToConversation})=>{
    const messageTyped = React.createRef()
    const onEnterPress = (e)=>{
        e.preventDefault();
        // alert("your message :" + messageTyped.current.value)
        
    var currentUser = JSON.parse(localStorage.getItem("chatWindowDetails")) 
    var id=currentUser.id+"/"+uuidv4()
    console.log("idididididid",id)
    var uid=currentUser.uid
    var uname=currentUser.username
        sendMessageToConversation(id,uid,uname,messageTyped.current.value)
    }
    return(
        <div className="footer-section">
            {/* ​<textarea id="txtArea" rows="10" cols="70"></textarea> */}
            <form onSubmit={onEnterPress}>
                <input id="message-typing-section" type="text" placeholder="Press enter to send your message"
                name="message" ref={messageTyped}/>
            </form>
        </div>
    )
}

export default SendMessageFromComponent;