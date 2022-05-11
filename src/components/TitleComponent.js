import React from "react";
import ThemesToggleSwitch from "./ThemesToggleSwitch";
import { ThemeContext } from "../App";
import Toggle from "react-toggle";

const TitleComponent = ({ appTitle }) => {
  var currentUser = JSON.parse(localStorage.getItem("chatWindowDetails"));
  const { theme, dark, toggle } = React.useContext(ThemeContext);
  return (
    <div
      className="header-section"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <div>{appTitle}</div>
      <div
        className="current-user-name"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        Name: {currentUser.username}
      </div>
      <div style={{float:'left'}}>
        <ThemesToggleSwitch toggleProp={toggle} darkProp={dark} />
      </div>
      {/* <div>
        <label>
          <Toggle defaultChecked={dark} icons={false} onChange={toggle} />
          <span>Toggle to {!dark ? "Dark" : "Light"} theme</span>
        </label>
      </div> */}
    </div>
  );
};

export default TitleComponent;
