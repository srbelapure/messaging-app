import React from 'react';
import { v4 as uuidv4 } from "uuid";

const SendMessageFromComponent =({sendMessageToConversation})=>{
    const messageTyped = React.createRef()
    const onEnterPress = (e)=>{
        e.preventDefault();
        var id=uuidv4()
        var uname=uuidv4() + "testUser"
        // alert("your message :" + messageTyped.current.value)
        sendMessageToConversation(id,uname,messageTyped.current.value)
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