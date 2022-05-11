import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "../Firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import ThemesToggleSwitch from "./ThemesToggleSwitch";
import { ThemeContext } from "../App";
import { useHistory,useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { db } from "../Firebase";
import { collection, getDocs,onSnapshot ,doc,addDoc, deleteDoc ,serverTimestamp } from "firebase/firestore";
import "./MessageAppStyles.css";

let warmColors=[
  "#9C0F48","#9C0F48","#FF7800","#FFCE45","#CAD315"
]

let lightColors=[
"#B4FF9F","#FD5D5D","#D18CE0","#65C18C","#E8E46E"
]

const HeaderComponent = () => {
  const [openLogin, setOpenLogin] = useState(false); // to open and close Sign in modal
  const [openSignUp, setOpenSignUp] = useState(false); // to open and close Sign in modal
  const [username, setUsername] = useState(""); // state for username field while logging in
  const [password, setPassword] = useState(""); // state for password field while logging in
  const [email, setEmail] = useState(""); // state for email field while logging in
  const [user, setUser] = useState(null); // To keep track of user we use this state (logged-in user)
  const { theme, dark, toggle } = React.useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/chatwindow");
      }
      else{
        history.push("/");
      }
    });
  }, []);

  useEffect(() => {
    // const unsubscribe = authWithEmail.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     //if user has logged inn
    //     setUser(authUser);
    //   } else {
    //     // if user has loggedd out
    //     setUser(null); // if user logs out set user to null
    //   }
    // });
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        //if user has logged inn
        setUser(authUser);
      } else {
        // if user has loggedd out
        setUser(null); // if user logs out set user to null
      }
    });
    return () => {
      // whenever changes occue this hook is refired, but before that clean-up the existing case and then re-trigger
      unsubscribe();
    };
  }, [user, username]); // user,username => because everytime values change we need to trigger the useEffect hook

  const onClickLoginButton = () => {
    setOpenLogin(true);
    setUsername("")
    setPassword("")
    setEmail("")
  };

  const onClickSignUpButton = () => {
    setOpenSignUp(true);
    setUsername("")
    setPassword("")
    setEmail("")
  };

  const onSignIn = (e) => {
    e.preventDefault();
    // authWithEmail
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((error) => alert(error.message));
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenLogin(false);
  };

  const onSignUp = (e) => {
    e.preventDefault();
    // authWithEmail
    //   .createUserWithEmailAndPassword(email, password) // email,password -> these are values from state
    //   .then((authUser) => {
    //     return authUser.user.updateProfile({
    //       displayName: username, //when user is created then add the username value to displayName attribute
    //     });
    //   })
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        return updateProfile(auth.currentUser, {
          displayName: username, //when user is created then add the username value to displayName attribute
        });
      })
      .then(() => {
        let randomNumberForWarmColor,randomNumberForLightColor;
        randomNumberForWarmColor = Math.floor(Math.random() * warmColors.length)
        randomNumberForLightColor = Math.floor(Math.random() * lightColors.length)
        // currIndex = g_idx++ % warmColors.length
        addDoc(collection(db, "users"), {
          uid: getAuth().currentUser.uid,
          uname: getAuth().currentUser.displayName,
          warmcolorcode:warmColors[randomNumberForWarmColor],
          lightcolorcode:lightColors[randomNumberForLightColor]
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  };

  const onClickLogout=()=>{
    signOut(auth)
    history.push("/");
  }

  // let classname= ""
  // if(window.innerWidth <= 500 && location.pathname === "/chatwindow"){
  //   classname = "app-title-hide"
  // }
  // else{
  //   classname ="app-title"
  // }

  return (
    <>
      <div
        className="header-section"
        style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
      >
        <h3
          className="app-title"
          style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
        >
          Chat Room
        </h3>
        {user ? (
          <div className="buttons-login-signup">
            <button
              className="logout-button"
              onClick={onClickLogout}
              style={{
                backgroundColor: theme.backgroundColor,
                color: theme.color,
              }}
            >
              Logout
            </button>
            <ThemesToggleSwitch toggleProp={toggle} darkProp={dark} />
          </div>
        ) : (
          <div className="buttons-login-signup">
            <button
              className="login-button"
              onClick={onClickLoginButton}
              style={{
                backgroundColor: theme.backgroundColor,
                color: theme.color,
              }}
            >
              Login
            </button>
            <button
              className="signup-button"
              onClick={onClickSignUpButton}
              style={{
                backgroundColor: theme.backgroundColor,
                color: theme.color,
              }}
            >
              Sign Up
            </button>
            <ThemesToggleSwitch toggleProp={toggle} darkProp={dark} />
          </div>
        )}
      </div>

      <Modal show={openLogin} onHide={() => setOpenLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="with-email-form" onSubmit={onSignIn}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="secondary"
              style={{ display: "flex", margin: "0px auto" }}
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={openSignUp} onHide={() => setOpenSignUp(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="with-email-form" onSubmit={onSignUp}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="username"
                placeholder="Enter user-name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="secondary"
              style={{ display: "flex", margin: "0px auto" }}
            >
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default HeaderComponent;
