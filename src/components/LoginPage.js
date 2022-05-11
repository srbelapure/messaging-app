import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
} from "reactstrap";
import { v4 as uuidv4 } from "uuid";

function LoginPage(props) {
  var [modalState, setModalState] = useState(false);
  var [validationErrors, setValidationErrors] = useState({});
  const username = useRef();
  const password = useRef();
  const remember = useRef();
  var addErrorsToRespectiveInputs = {};

  // useEffect(()=>{
  //    props.fetchUsers() // API to get existing users list
  // },[])

  function modalOpenClose() {
    setModalState(!modalState);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(
    //   "Username: " +
    //     username.current.value +
    //     " Password: " +
    //     password.current.value +
    //     " Remember: " +
    //     remember.current.checked
    // );
    var id = (props.existingUsersDetails.user.length + 1).toString();
    var uid = id;
    var loggedInUserDetails = {
      username: username.current.value,
      id: id,
      uid: uid
    };
    localStorage.setItem(
      "chatWindowDetails",
      JSON.stringify(loggedInUserDetails)
    );
    // props.fetchUsers()
    addErrorsToRespectiveInputs = validate();
    setValidationErrors((validationErrors = addErrorsToRespectiveInputs));
    if (
      addErrorsToRespectiveInputs.username === "" &&
      addErrorsToRespectiveInputs.password === ""
    ) {
      props.loginUserDetails(id, uid, username.current.value);
      window.location.href = "/chatwindow";
    }
  };

  function validate() {
    const errors = {
      username: "",
      password: "",
    };
    if (username.current.value === "")
      errors.username = "Enter a valid username";
    if (password.current.value === "")
      errors.password = "Enter a valid password";

    return errors;
  }
  return (
    <div>
      {/* <Button onClick={modalOpenClose}>Sign_in/Sign_up</Button> */}
      <Modal isOpen={modalState} toggle={modalOpenClose}>
        <ModalHeader toggle={modalOpenClose}>Login Details</ModalHeader>
        <ModalBody className="login-modal-body">
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                // innerRef={(input) => this.username = input}
                ref={username}
              />
              {validationErrors.username !== "" ? (
                <div className="error-display">{validationErrors.username}</div>
              ) : (
                <div style={{ display: "none" }}>
                  {validationErrors.username}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                // innerRef={(input) => this.password = input}
                ref={password}
              />
              {validationErrors.password !== "" ? (
                <div className="error-display">{validationErrors.password}</div>
              ) : (
                <div style={{ display: "none" }}>
                  {validationErrors.password}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  // innerRef={(input) => this.remember = input}
                  ref={remember}
                />
                Remember me
              </label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>$hoppingC@rt.inc All Rights Reserved</ModalFooter>
      </Modal>
    </div>
  );
}

export default LoginPage;
