import React, { useState, useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { USER_LOGIN, ADD_USER } from "../utils/mutations";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { modalActions } from "../redux/actions/";

//get parameters for size of cards to use in component
const Login = ({
  signInTopVal,
  signInInsideVal,
  signUpTopVal,
  signUpInsideVal,
  bgColor,
}) => {
  //to save data to redux store
  const dispatch = useDispatch();
  //local component state
  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });
  const [userCreateData, setUserCreateData] = useState({
    createUsername: "",
    createEmail: "",
    createPassword: "",
    repeatPassword: "",
  });
  const [signInTop, setSignInTop] = useState(signInTopVal);
  const [signInInside, setSignInInside] = useState(signInInsideVal);
  const [signUpTop, setSignUpTop] = useState(signUpTopVal);
  const [signUpInside, setSignUpInside] = useState(signUpInsideVal);
  //keep state of client side field validators
  const [validatorLogin] = useState(new SimpleReactValidator());
  const [validatorCreate] = useState(new SimpleReactValidator());
  // eslint-disable-next-line
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  //get ability to use graphql mutations for create user and login user
  const [login] = useMutation(USER_LOGIN);
  const [addUser] = useMutation(ADD_USER);

  useEffect(() => {
    setSignInTop(signInTopVal);
    setSignInInside(signInInsideVal);
    setSignUpTop(signUpTopVal);
    setSignUpInside(signUpInsideVal);
  }, [signInTopVal, signInInsideVal, signUpTopVal, signUpInsideVal]);
  //use react router history
  const history = useHistory();
  //keep user input in state
  const handleLoginInputChange = (event) => {
    const { id, value } = event.target;
    setUserLoginData({ ...userLoginData, [id]: value });
  };
  const handleCreateInputChange = (event) => {
    const { id, value } = event.target;
    setUserCreateData({ ...userCreateData, [id]: value });
  };
  //on login button click
  const handleFormLogin = async (event) => {
    //prevent server reload of page on click
    event.preventDefault();
    //check that client field validation is good
    if (validatorLogin.allValid()) {
      try {
        //check login via graphql mutation
        //this line breaks
        const { data } = await login({
          variables: { ...userLoginData },
        });
        //also login via Auth utility to generate a token for extra security, this also adds logged in user data to redux store
        Auth.login(
          data.login.token,
          data.login.user._id,
          data.login.user.username,
          data.login.user.email,
          data.login.user.isVerified
        );

        //send user to dashboard after login
        history.push("/dashboard");
      } catch (err) {
        //provide user with error message in modal using redux state date
        dispatch(modalActions.updateAndShowModal("Error", err.message));
      }
    } else {
      //show issues with validation
      validatorLogin.showMessages();
      //force update state to show validation messages to user
      forceUpdate();
    }
  };
  //on create user button click
  const handleFormCreate = async (event) => {
    event.preventDefault();
    if (validatorCreate.allValid()) {
      try {
        //create user via graphql mutation
        const { data } = await addUser({
          variables: {
            username: userCreateData.createUsername,
            email: userCreateData.createEmail,
            password: userCreateData.createPassword,
          },
        });
        //also login via Auth utility to generate a token for extra security, this also adds logged in user data to redux store
        Auth.login(
          data.addUser.token,
          data.addUser.user._id,
          data.addUser.user.username,
          data.addUser.user.email,
          data.addUser.user.isVerified
        );
        //after user is created, forward them to a page to verify their email address
        if (!data.addUser.user.isVerified) {
          history.push(
            "/verify?id=" +
              data.addUser.user._id +
              "&username=" +
              userCreateData.createUsername +
              "&email=" +
              userCreateData.createEmail
          );
        } else {
          //if already verified (which is not currently possible), send user to dashboard
          history.push("/dashboard");
        }
      } catch (err) {
        //provide user with error message in modal using redux state date
        dispatch(modalActions.updateAndShowModal("Error", err.message));
      }
    } else {
      validatorCreate.showMessages();
      forceUpdate();
    }
  };
  //handle changes to css based on user action, toggle which card shows for user
  const handleCardToggle = async (event) => {
    const parentEl = event.target.parentElement;
    if (parentEl.classList.contains("signin-card")) {
      setSignInTop("383.333px");
      setSignInInside("581.075px");
      setSignUpTop("0px");
      setSignUpInside("0px");
    } else if (parentEl.classList.contains("signup-card")) {
      setSignInTop("0px");
      setSignInInside("0px");
      setSignUpTop("383.333px");
      setSignUpInside("581.075px");
    }
  };

  return (
    <>
      <section className="viewport login-section " style={{ height: "65em" }}>
        <div className="image" style={{ backgroundColor: bgColor }}></div>
        <div className="container mt-8 login-container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-md-6 col-lg-5">
              <div
                className="accordion-group accordion-group-portal"
                data-accordion-group
              >
                <div className="accordion open" data-accordion>
                  <div className="signin-card" onClick={handleCardToggle}>
                    <div className="accordion-control signin-card" data-control>
                      <h5>Sign In</h5>
                    </div>
                    <div
                      className="accordion-content"
                      style={{
                        transition: "max-height 300ms ease 0s",
                        maxHeight: signInTop,
                      }}
                      data-content
                    >
                      <div
                        className="accordion-content-wrapper"
                        style={{
                          overflow: "hidden",
                          transition: "max-height 300ms ease 0s",
                          maxHeight: signInInside,
                        }}
                      >
                        <form>
                          <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              placeholder="name@example.com"
                              onChange={handleLoginInputChange}
                              value={userLoginData.email}
                              required
                            />
                            {validatorLogin.message(
                              "email",
                              userLoginData.email,
                              "required|email"
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="********"
                              onChange={handleLoginInputChange}
                              value={userLoginData.password}
                              required
                            />
                            {validatorLogin.message(
                              "password",
                              userLoginData.password,
                              "required"
                            )}
                          </div>
                          <button
                            className="btn btn-primary btn-block"
                            onClick={handleFormLogin}
                          >
                            Sign In
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="accordion" data-accordion>
                  <div className="signup-card" onClick={handleCardToggle}>
                    <div
                      className="accordion-control signup-card"
                      style={{
                        transition: "max-height 300ms ease 0s",
                        maxHeight: signUpTop,
                      }}
                      data-control
                    >
                      <h5>Create Account</h5>
                    </div>
                    <div
                      className="accordion-content create-account-card"
                      style={{
                        overflow: "hidden",
                        transition: "max-height 300ms ease 0s",
                        maxHeight: signUpInside,
                      }}
                      data-content
                    >
                      <div className="accordion-content-wrapper">
                        <form>
                          <div className="form-group">
                            <label htmlFor="createUsername">Username</label>
                            <input
                              type="text"
                              className="form-control"
                              id="createUsername"
                              placeholder="name@example.com"
                              onChange={handleCreateInputChange}
                              value={userCreateData.createUsername}
                            />
                            {validatorCreate.message(
                              "username",
                              userCreateData.createUsername,
                              "required|min:3"
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="createEmail">Email address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="createEmail"
                              placeholder="name@example.com"
                              onChange={handleCreateInputChange}
                              value={userCreateData.createEmail}
                            />
                            {validatorCreate.message(
                              "email",
                              userCreateData.createEmail,
                              "required|email"
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="createPassword">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="createPassword"
                              placeholder="********"
                              onChange={handleCreateInputChange}
                              value={userCreateData.createPassword}
                            />
                            {validatorCreate.message(
                              "password",
                              userCreateData.createPassword,
                              `required|in:${userCreateData.repeatPassword}|min:5`,
                              {
                                messages: {
                                  in: "Passwords need to match.",
                                },
                              }
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="password">Repeat Password</label>
                            <input
                              type="password"
                              className="form-control"
                              id="repeatPassword"
                              placeholder="********"
                              onChange={handleCreateInputChange}
                              value={userCreateData.repeatPassword}
                            />
                            {validatorCreate.message(
                              "password",
                              userCreateData.repeatPassword,
                              `required|in:${userCreateData.createPassword}|min:5`,
                              {
                                messages: {
                                  in: "Passwords need to match.",
                                },
                              }
                            )}
                          </div>
                          <button
                            className="btn btn-primary btn-block"
                            onClick={handleFormCreate}
                          >
                            Sign Up and Sign In
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-5 mx-auto pt-2">
                  <div className="text-center text-white">
                    <Link to="/forgot">Forgot Password</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
