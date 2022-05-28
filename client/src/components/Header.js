// import { Link } from "react-router-dom";
// import Auth from "../utils/auth";
// import { useSelector } from "react-redux";

// const Header = ({ toTop }) => {
//   //get current logged in user data from redux store for conditional nav bar
//   const user = useSelector((state) => state.loggedInUser);
//   return (
//     <>
//       <header className="header-sticky header-dark">
//         <div className="container">
//           <nav className="navbar navbar-expand-lg navbar-dark">
//             <Link className="navbar-brand" to="/" onClick={toTop}>
//               <img
//                 className="navbar-logo navbar-logo-light"
//                 src="/assets/images/logo-light.png"
//                 alt="Smart-Cube Logo"
//               />
//               <img
//                 className="navbar-logo navbar-logo-dark"
//                 src="/assets/images/logo-dark.png"
//                 alt="Smart-Cube Logo"
//               />
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-toggle="collapse"
//               data-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="burger">
//                 <span></span>
//               </span>
//             </button>

//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav align-items-center mr-auto">
//                 <li className="nav-item">
//                   <Link
//                     className="nav-link"
//                     to="/"
//                     role="button"
//                     onClick={toTop}
//                   >
//                     Home
//                   </Link>
//                 </li>
//               </ul>
//               <ul className="navbar-nav align-items-center mr-0">
//                 {user.loggedIn ? (
//                   <>
//                     {user.loggedIn && !user.isVerified && (
//                       <li className="nav-item">
//                         <Link
//                           className="nav-link"
//                           to={`/verify?id=${user.id}&username=${user.username}&email=${user.email}`}
//                         >
//                           Verify Email
//                         </Link>
//                       </li>
//                     )}
//                     <li className="nav-item dropdown">
//                       <Link
//                         className="nav-link dropdown-toggle"
//                         id="navbarDropdown"
//                         role="button"
//                         data-toggle="dropdown"
//                         aria-haspopup="true"
//                         aria-expanded="false"
//                         to="/"
//                         onClick={(event) => event.preventDefault()}
//                       >
//                         {user.username}
//                       </Link>
//                       <div
//                         className="dropdown-menu"
//                         aria-labelledby="navbarDropdown"
//                       >
//                         <Link className="dropdown-item" to="/dashboard">
//                           Dashboard
//                         </Link>
//                         <div className="dropdown-divider"></div>
//                         <Link
//                           className="dropdown-item"
//                           to="/"
//                           onClick={() => {
//                             Auth.logout();
//                           }}
//                         >
//                           Logout
//                         </Link>
//                       </div>
//                     </li>
//                   </>
//                 ) : (
//                   <>
//                     <li className="nav-item">
//                       <Link className="nav-link" to="/signup">
//                         Sign Up
//                       </Link>
//                     </li>
//                     <li className="nav-item">
//                       <Link className="nav-link" to="/login">
//                         Login
//                       </Link>
//                     </li>
//                   </>
//                 )}
//               </ul>
//             </div>
//           </nav>
//         </div>
//       </header>
//     </>
//   );
// };

// export default Header;

// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   CssBaseline,
//   Typography,
//   makeStyles,
//   useTheme,
//   useMediaQuery,
// } from "@material-ui/core";
// import { Link } from "react-router-dom";
// // import DrawerComponent from "./Drawer";

// const useStyles = makeStyles((theme) => ({
//   navlinks: {
//     marginLeft: theme.spacing(5),
//     display: "flex",
//   },
//   logo: {
//     Img: "/assets/images/logo-light.png",
//     flexGrow: "1",
//     cursor: "pointer",
//   },
//   link: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "20px",
//     marginLeft: theme.spacing(20),
//     "&:hover": {
//       color: "yellow",
//       borderBottom: "1px solid white",
//     },
//   },
// }));

// function Header() {
//   const classes = useStyles();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   return (
//     <AppBar position="static">
//       <CssBaseline />
//       <Toolbar>
//         <Typography variant="h4" className={classes.logo}>
//           Smart Cube
//         </Typography>

//           <div className={classes.navlinks}>
//             <Link to="/" className={classes.link}>
//               Home
//             </Link>
//             <Link to="/login" className={classes.link}>
//               Login/SignUp
//             </Link>
//           </div>

//       </Toolbar>
//     </AppBar>
//   );
// }
// export default Header;

import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Auth from "../utils/auth";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Link to="/">
          <img
            className="logo-sm"
            src="/assets/images/logo-light.png"
            alt="Smart-Cube Logo"
          />
        </Link>
        <Navbar.Brand as={Link} to="/">
          SMART CUBE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="ml-auto">
            {/* if user is logged in show saved books and logout */}
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Your Device
                </Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/"></Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
