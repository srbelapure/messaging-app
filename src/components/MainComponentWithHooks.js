import React, { Component, useEffect, useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchMessages,
  sendMessageToConversation,
  loginUserDetails,
  fetchUsers,
} from "../redux/ActionCreators";
import LoginPage from "./LoginPage";
import ChatWindowPage from "./ChatWindowPage";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc } from "firebase/firestore";
import { ThemeContext } from "../App";
import { useLocation } from "react-router-dom";
import "./MessageAppStylesNew.css";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
    conversationMessages: state.messages_in_conversation,
    userDetailsOnLogin: state.login_user,
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => dispatch(fetchMessages()),
  // sendMessageToConversation:(name,message)=>dispatch(sendMessageToConversation(name,message))
  sendMessageToConversation: (id, uid, name, message) =>
    dispatch(sendMessageToConversation(id, uid, name, message)),
  loginUserDetails: (id, uid, uname) =>
    dispatch(loginUserDetails(id, uid, uname)),
  fetchUsers: () => dispatch(fetchUsers()),
});

// export const themes = {
//   light: {
//     backgroundColor: "whitesmoke",
//     color: "#4e061c",
//   },
//   dark: {
//     backgroundColor: "#4e061c",
//     color: "whitesmoke",
//   },
// };

// const initialState = {
//   dark: false,
//   theme: themes.light,
//   toggle: () => {},
// };
// export const ThemeContext = React.createContext(initialState);

const MainComponentWithHooks = (props) => {
  // const [dark, setDark] = useState(false); // Default theme is light
  const [messages,setMessages] = useState([])
  const { theme, dark, toggle } = React.useContext(ThemeContext);
  const location = useLocation();

  // // On mount, read the preferred theme from the persistence
  // useEffect(() => {
  //   const isDark = localStorage.getItem("isthemedark") === "true";
  //   setDark(isDark);
  // }, [dark]);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(
  //     collection(db, "messages"),
  //     (snapshot) => {
  //       setMessages(
  //         snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //       );
  //     }
  //   );
  //   // const unsubscribe = db.collection("savedplaces").onSnapshot((snapshot) => {
  //   //   setSavedPlace(
  //   //     snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
  //   //   );
  //   // });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  

  // // To toggle between dark and light modes
  // const toggle = () => {
  //   const isDark = !dark;
  //   localStorage.setItem("isthemedark", JSON.stringify(isDark));
  //   setDark(isDark);
  // };

  // const theme = dark ? themes.dark : themes.light;

  // useEffect(() => {
  //   /**Removing the below 2 calls because I am now using firestore database and authentication
  //    * Earlier I was using Json server as backend
  //    */
  //   // props.fetchMessages();
  //   // props.fetchUsers();
  // }, []);
  return (
    <React.Fragment>
      <div className={location.pathname ==='/'? (dark? "dark-main-container" :"light-main-container") :  (dark ? "dark-main-container-no-image" : "light-main-container-no-image")}>
        {/* <ThemeContext.Provider value={{ theme, dark, toggle }}> */}
          <Switch location={props.location}>
            <Route
              exact
              path="/"
              component={() => (
                <LoginPage
                  loginUserDetails={props.loginUserDetails}
                  fetchUsers={props.fetchUsers}
                  existingUsersDetails={props.userDetailsOnLogin}
                />
              )}
            />
            <Route
              path="/chatwindow"
              component={() => (
                <ChatWindowPage
                  // messagesList={props.conversationMessages.messages}
                  // messagesList={messages}
                  // fetchMessages={this.props.fetchMessages}
                  sendMessageToConversation={props.sendMessageToConversation}
                />
              )}
            />
          </Switch>
        {/* </ThemeContext.Provider> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponentWithHooks)
);
