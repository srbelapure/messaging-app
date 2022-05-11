import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMessages, sendMessageToConversation,loginUserDetails,fetchUsers} from "../redux/ActionCreators";
import LoginPage from './LoginPage'
import ChatWindowPage from './ChatWindowPage'
import "./MessageAppStylesNew.css";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
      conversationMessages : state.messages_in_conversation,
      userDetailsOnLogin:state.login_user
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
    fetchMessages:() => dispatch(fetchMessages()),
    // sendMessageToConversation:(name,message)=>dispatch(sendMessageToConversation(name,message))
    sendMessageToConversation:(id,uid,name,message)=>dispatch(sendMessageToConversation(id,uid,name,message)),
    loginUserDetails:(id,uid,uname)=>dispatch(loginUserDetails(id,uid,uname)),
    fetchUsers:()=>dispatch(fetchUsers())
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /**Removing the below 2 calls because I am now using firestore database and authentication
     * Earlier I was using Json server as backend
     */
      // this.props.fetchMessages()
      // this.props.fetchUsers()
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <Switch location={this.props.location}>
          <Route exact path="/" 
          component={()=>(<LoginPage
           loginUserDetails={this.props.loginUserDetails}
           fetchUsers={this.props.fetchUsers}
           existingUsersDetails={this.props.userDetailsOnLogin}
          />)} 
          />
          <Route
            path="/chatwindow"
            component={() => (
              <ChatWindowPage
              messagesList={this.props.conversationMessages.messages}
              // fetchMessages={this.props.fetchMessages}
              sendMessageToConversation={this.props.sendMessageToConversation}
              />
            )}
          />
        </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
