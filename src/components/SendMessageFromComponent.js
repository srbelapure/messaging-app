import React from 'react';
import { v4 as uuidv4 } from "uuid";
import {ThemeContext} from '../App'
import { getAuth } from "firebase/auth";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";
import firebase from 'firebase/compat/app';

const SendMessageFromComponent =({sendMessageToConversation})=>{
    const messageTyped = React.createRef()
    const onEnterPress = (e)=>{
      e.preventDefault();

      // var currentUser = JSON.parse(localStorage.getItem("chatWindowDetails"))
      var id = getAuth().currentUser.uid + "/" + uuidv4();
      // console.log("idididididid",id)
      // var uid=currentUser.uid
      // var uname=currentUser.username
      //     sendMessageToConversation(id,uid,uname,messageTyped.current.value)

      addDoc(collection(db, "messages"), {
        id: id,
        message: messageTyped.current.value,
        uid: getAuth().currentUser.uid,
        uname: getAuth().currentUser.displayName,
        timestamp: serverTimestamp()
      });
      messageTyped.current.value = "";
    }
    const { theme} = React.useContext(ThemeContext);
    return(
        <div className="footer-section" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
            {/* ​<textarea id="txtArea" rows="10" cols="70"></textarea> */}
            <form onSubmit={onEnterPress}>
                <input id="message-typing-section" type="text" placeholder="Press enter to send your message"
                name="message" ref={messageTyped} style={{ backgroundColor: theme.backgroundColor, color: theme.color }}/>
            </form>
        </div>
    )
}

export default SendMessageFromComponent;