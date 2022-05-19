import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_EMAIL_VERIFICATION_TOKEN, VERIFY_EMAIL } from "../utils/mutations";
import { GET_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../redux/actions/";

const VerifyEmail = (params) => {
    console.log("VerifyEmail start");
    //get bgColor from parent component
    const bgColor = params.bgColor;
    //to save and get data to redux store user object
    const user = useSelector((state) => state.loggedInUser);
    //to update redux store
    const dispatch = useDispatch();
    //local component state
    const [isDisabledButton, setIsDisabledButton] = useState(false);
    //graphql mutations to save and send a token to user and to verify with that token
    const [addEmailVerificationToken] = useMutation(
        ADD_EMAIL_VERIFICATION_TOKEN
    );
    const [verifyEmail] = useMutation(VERIFY_EMAIL);
    //use react router history
    const history = useHistory();
    //get url query string parameters
    const search = window.location.search;
    //parameters that come from the url query string (ex: ?id=6196c4b1442ed72c31ac36f6&username=upstudy_admin&email=admin@upstudy.io)
    const urlParams = new URLSearchParams(search);
    let createdEmail = urlParams.get("email");
    let createdToken = urlParams.get("token");
    let userId = urlParams.get("id");
    let username = urlParams.get("username");
    //get user data from db to check if they are already verified
    const { loading, data } = useQuery(GET_USER, {
        variables: { userId },
        fetchPolicy: "network-only",
    });
    //wrapped mutation to create and generate token for email validation
    const generateVerificationEmail = async (userId, username, email) => {
        await addEmailVerificationToken({
            variables: {
                userId,
                username,
                email,
            },
        });
    };
    //wrapped mutation to save that an email was verified
    const verifyUserEmail = async (email, token) => {
        return await verifyEmail({
            variables: {
                email,
                token,
            },
        });
    };
    //create a new token and resent to user via email
    const handleResendVerificationEmail = async (event) => {
        event.preventDefault();
        await addEmailVerificationToken({
            variables: {
                userId,
                username,
                email: createdEmail,
            },
        });
        setIsDisabledButton(true);
    };
    useEffect(() => {
        //internal function so it can be async
        async function processUrlParams() {
            //check if there is a username url query parameter and if the user is logged in
            if (username && Auth.loggedIn()) {
                //if so send them a verification email
                try {
                    await generateVerificationEmail(
                        userId,
                        username,
                        createdEmail
                    );
                } catch (error) {
                    history.push("/error", { data: error });
                }
            } else if (createdToken) {
                //else if the token is in the url param
                try {
                    //graphql call to verify the email address associated with the token
                    const userData = await verifyUserEmail(
                        createdEmail,
                        createdToken
                    );
                    //get data from the verification mutation return and login with it
                    const user = userData.data.verifyEmail.user;
                    dispatch(
                        userActions.loginRedux(
                            user._id,
                            user.username,
                            user.email,
                            user.isVerified,
                           
                        )
                    );
                } catch (error) {
                    history.push("/error", { data: error });
                }
            } else {
                //if the query string is invalid send to 404 page
                history.push("/404");
            }
        }
        if (!loading) {
            const isVerified = data?.user.isVerified;
            if (!isVerified) {
                //user is not verified
                processUrlParams();
            } else {
                //user is verified
                dispatch(
                    userActions.loginRedux(
                        user._id,
                        user.username,
                        user.email,
                        true
                        
                    )
                );
            }
        }
        // eslint-disable-next-line
    }, [data, loading]);

    return (
        <>
            <div className="viewport">
                <div
                    className="image"
                    style={{ backgroundColor: bgColor }}
                ></div>
                <div className="container">
                    <div className="row justify-content-center align-items-center vh-100">
                        {!user.isVerified ? (
                            <div className="col-md-6 col-lg-4 text-white text-center">
                                <h1>Check your email</h1>
                                <p>
                                    Click the link to verify your email address.
                                    You can continue to use the site but will be
                                    reminded to verify your email address until
                                    you do so.
                                </p>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-white mr-1 mb-1"
                                        type="button"
                                        onClick={handleResendVerificationEmail}
                                        disabled={isDisabledButton}
                                    >
                                        Resend Email
                                    </button>

                                    <Link to="/">
                                        <button
                                            className="btn btn-white mr-1 mb-1"
                                            type="button"
                                        >
                                            Go Home
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-6 col-lg-4 text-white text-center">
                                <h1>Your email address has been verified.</h1>
                                <p>Get going and save some water!</p>
                                <div className="mt-3">
                                    <Link to="/">
                                        <button
                                            className="btn btn-white mr-1 mb-1"
                                            type="button"
                                        >
                                            Go Home
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default VerifyEmail;
