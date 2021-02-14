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

export const themes = {
  light: {
    backgroundColor: "whitesmoke",
    color: "#4e061c",
  },
  dark: {
    backgroundColor: "#4e061c",
    color: "whitesmoke",
  },
};

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};
export const ThemeContext = React.createContext(initialState);

const MainComponentWithHooks = (props) => {
  const [dark, setDark] = useState(false); // Default theme is light

  // On mount, read the preferred theme from the persistence
  useEffect(() => {
    const isDark = localStorage.getItem("isthemedark") === "true";
    setDark(isDark);
  }, [dark]);

  // To toggle between dark and light modes
  const toggle = () => {
    const isDark = !dark;
    localStorage.setItem("isthemedark", JSON.stringify(isDark));
    setDark(isDark);
  };

  const theme = dark ? themes.dark : themes.light;

  useEffect(() => {
    props.fetchMessages();
    props.fetchUsers();
  }, []);
  
  return (
    <React.Fragment>
      <div className="main-container">
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
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
                  messagesList={props.conversationMessages.messages}
                  // fetchMessages={this.props.fetchMessages}
                  sendMessageToConversation={props.sendMessageToConversation}
                />
              )}
            />
          </Switch>
        </ThemeContext.Provider>
      </div>
    </React.Fragment>
  );
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainComponentWithHooks)
);
