import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import MainComponentWithHooks from "./components/MainComponentWithHooks";

const store = ConfigureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            {/* <Main/> */}
            <MainComponentWithHooks />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
