import React,{useEffect, useState} from "react";
import TitleComponent from "./TitleComponent";
import MessageListComponent from "./MessageListComponent";
import SendMessageFromComponent from "./SendMessageFromComponent";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc,query, orderBy } from "firebase/firestore";

const ChatWindowPage = ({ messagesList,sendMessageToConversation }) => {
  const [messages,setMessages] = useState([])
  const [userDetails,setUserDetails] = useState([])
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      }
    );
    // const unsubscribe = db.collection("savedplaces").onSnapshot((snapshot) => {
    //   setSavedPlace(
    //     snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
    //   );
    // });
    return () => {
      unsubscribe();
    };
  }, []);
  // React.useEffect(
  //   () => { fetchMessages()},[]
  // );
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUserDetails(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      }
    );

    // const unsubscribe = db.collection("savedplaces").onSnapshot((snapshot) => {
    //   setSavedPlace(
    //     snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
    //   );
    // });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      {/* <TitleComponent appTitle="FriendsHangoutApp" /> */}
      <MessageListComponent messagesList={messages} userDetails={userDetails}/>
      <SendMessageFromComponent 
      sendMessageToConversation={sendMessageToConversation} 
      />
    </React.Fragment>
  );
};

export default ChatWindowPage;
