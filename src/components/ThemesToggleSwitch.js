import React,{useState,useContext} from "react";
import Toggle from 'react-toggle'

const ThemesToggleSwitch = (props) => {
  return (
      <label style={{display:"flex"}} className="toggle-button-details">
        <Toggle
        //   defaultChecked={this.state.theme}
        //   icons={false}
        //   onChange={this.onThemeChange}
          defaultChecked={props.darkProp}
          icons={false}
          onChange={props.toggleProp}
        />
        <span style={{marginLeft:"4px",fontWeight:"400"}}>{!props.darkProp ? "Dark" : "Light"} theme</span>
      </label>
  );
};

export default ThemesToggleSwitch;
