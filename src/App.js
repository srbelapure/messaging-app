import React, { Component, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import MainComponentWithHooks from "./components/MainComponentWithHooks";
import HeaderComponent from './components/HeaderComponent'
import { withRouter } from "react-router";

const store = ConfigureStore();

export const themes = {
  light: {
    backgroundColor: "whitesmoke",
    color: "rgb(53,54,58)",
  },
  dark: {
    backgroundColor: "rgb(53,54,58)",
    color: "whitesmoke",
  },
};

const initialState = {
  dark: false,
  theme: themes.light,
  toggle: () => {},
};
export const ThemeContext = React.createContext(initialState);

const App =()=>{
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
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  // render() {
    return (
      <Provider store={store}>
        <ThemeContext.Provider value={{ theme, dark, toggle }}>
        {/* <BrowserRouter> */}
        <HeaderComponent/>
          {/* <React.Fragment> */}
            {/* <Main/> */}
            <MainComponentWithHooks/>
          {/* </React.Fragment> */}
        {/* </BrowserRouter> */}
        </ThemeContext.Provider>
      </Provider>
    );
  // }
}

export default withRouter(App);
