import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMessages, sendMessageToConversation} from "../redux/ActionCreators";
import LoginPage from './LoginPage'
import ChatWindowPage from './ChatWindowPage'
import "./MessageAppStylesNew.css";

//once we connect the mapStateToProps to the component with connect(), mapStateToProps gets state as an argument
const mapStateToProps = (state) => {
  return {
      conversationMessages : state.messages_in_conversation,
      loginUserDetails:state.login_user
  };
};

//once we connect mapDispatchToProps to component with connect(),mapDispatchToProps gets dispatch as an argument
const mapDispatchToProps = (dispatch) => ({
    fetchMessages:() => dispatch(fetchMessages()),
    // sendMessageToConversation:(name,message)=>dispatch(sendMessageToConversation(name,message))
    sendMessageToConversation:(id,name,message)=>dispatch(sendMessageToConversation(id,name,message))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
      this.props.fetchMessages()
  }

  render() {
      console.log("this.props.fetchMessages",this.props.conversationMessages)
    return (
      <React.Fragment>
        <div className="main-container">
          <Switch location={this.props.location}>
          <Route exact path="/" 
          component={LoginPage} 
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
