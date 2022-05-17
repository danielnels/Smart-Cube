import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useSelector } from "react-redux";

const Header = ({ toTop }) => {
    //get current logged in user data from redux store for conditional nav bar
    const user = useSelector((state) => state.loggedInUser);
    return (
        <>
            <header className="header-sticky header-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <Link className="navbar-brand" to="/" onClick={toTop}>
                            <img
                                className="navbar-logo navbar-logo-light"
                                src="/assets/images/logo-light.png"
                                alt="David Tunnell Logo"
                            />
                            <img
                                className="navbar-logo navbar-logo-dark"
                                src="/assets/images/logo-dark.png"
                                alt="David Tunnell Logo"
                            />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="burger">
                                <span></span>
                            </span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav align-items-center mr-auto">
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/"
                                        role="button"
                                        onClick={toTop}
                                    >
                                        Home
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav align-items-center mr-0">
                                {user.loggedIn ? (
                                    <>
                                        {user.loggedIn && !user.isVerified && (
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    to={`/verify?id=${user.id}&username=${user.username}&email=${user.email}`}
                                                >
                                                    Verify Email
                                                </Link>
                                            </li>
                                        )}
                                        <li className="nav-item dropdown">
                                            <Link
                                                className="nav-link dropdown-toggle"
                                                id="navbarDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                                to="/"
                                                onClick={(event) =>
                                                    event.preventDefault()
                                                }
                                            >
                                                {user.username}
                                            </Link>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <Link
                                                    className="dropdown-item"
                                                    to="/dashboard"
                                                >
                                                    Dashboard
                                                </Link>
                                                <div className="dropdown-divider"></div>
                                                <Link
                                                    className="dropdown-item"
                                                    to="/"
                                                    onClick={() => {
                                                        Auth.logout();
                                                    }}
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        </li>
                                    </>
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
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
