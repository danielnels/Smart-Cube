import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useSelector } from "react-redux";

const Footer = ({ toTop }) => {
    //get whether user is logged in from redux store to show conditional nav bar
    const isLoggedIn = useSelector((state) => state.loggedInUser.loggedIn);
    return (
        <>
            <footer className="bg-dark text-white">
                <div className="separator-top">
                    <div className="container py-5">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-md-5 text-center text-md-left">
                                <ul className="nav">
                                    {isLoggedIn ? (
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                to="/"
                                                onClick={() => {
                                                    Auth.logout();
                                                }}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    to="/signup"
                                                >
                                                    Sign Up
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    to="/login"
                                                >
                                                    Login
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="col-md-2 text-center">
                                <Link
                                    to={{
                                        pathname: "/",
                                    }}
                                    onClick={toTop}
                                >
                                    
                                </Link>
                            </div>
                            <div className="col-md-5 text-center text-md-right"></div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
