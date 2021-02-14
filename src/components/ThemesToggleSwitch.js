import React,{useState,useContext} from "react";
import Toggle from 'react-toggle'

const ThemesToggleSwitch = (props) => {
  return (
      <label>
        <Toggle
        //   defaultChecked={this.state.theme}
        //   icons={false}
        //   onChange={this.onThemeChange}
          defaultChecked={props.darkProp}
          icons={false}
          onChange={props.toggleProp}
        />
        <span>Toggle to {!props.darkProp ? "Dark" : "Light"} theme</span>
      </label>
  );
};

export default ThemesToggleSwitch;
