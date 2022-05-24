import Header from "./components/Header";
import Footer from "./components/Footer";
import InfoModal from "./components/InfoModal";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import Error from "./components/Error";
import ForgotPassword from "./components/ForgotPassword";
import Auth from "./utils/auth";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { modalActions, userActions } from "./redux/actions/";



//top use the react router package, surround the whole app with the router component
function App() {
    //this main color is used in child components in many places
    const mainColor = "#2e4fc7";
    //get redux store data for categories
  
    //get redux store data for modal
    const modalSettings = useSelector((state) => state.modalSettings); //for putting in modal
    const dispatch = useDispatch();
    //smooth scroll to top function to be passed as a parameter, should this be replaced with ./utils/useScrollToTop?
    const toTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    //use react router history
    const history = useHistory();
    //run every change
    useEffect(() => {
        //run only when a router changes
        history.listen(() => {
            //if the user is found not to be logged in via jwt then log them out as far as redux is concerned
            if (!Auth.loggedIn()) {
                dispatch(userActions.logoutRedux());
            }
            console.log("Auth.loggedIn() was run - token check");
        });
    });

    return (
        <>
            {/* ^ the apollo provider wrapper allows the use of graphql calls throughout the app */}
            <div className="App">
                <Header toTop={toTop} />
                <div className="content">
                    {/* switch/route renders different components based on url */}
                    <Switch>
                        <Route exact path="/">
                            <Home bgColor={mainColor} />
                        </Route>
                        <Route exact path="/login">
                            <Login
                                signInTopVal="383.333px"
                                signInInsideVal="581.075px"
                                signUpTopVal="0px"
                                signUpInsideVal="0px"
                                bgColor={mainColor}
                            />
                        </Route>
                        <Route exact path="/signup">
                            <Login
                                signInTopVal="0px"
                                signInInsideVal="0px"
                                signUpTopVal="383.333px"
                                signUpInsideVal="581.075px"
                                bgColor={mainColor}
                            />
                        </Route>
                        <Route exact path="/verify">
                            <VerifyEmail bgColor={mainColor} />
                        </Route>
                        <Route exact path="/forgot">
                            <ForgotPassword bgColor={mainColor} />
                        </Route>
                       
                        
                       
                        <Route path="/404">
                            <NotFound bgColor={mainColor} />
                        </Route>
                        <Route path="/error">
                            <Error bgColor={mainColor} />
                        </Route>
                        {/* all other routes go to a 404 page - must be at bottom*/}
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
                {/* the modal is available everywhere and modified via redux store*/}
                <InfoModal
                    show={modalSettings.show}
                    title={modalSettings.title}
                    content={modalSettings.content}
                    imageUrl={modalSettings.imageUrl}
                    closeModal={() => dispatch(modalActions.hideModal())}
                />
               
                <Footer toTop={toTop} />
            </div>
        </>
    );
}

export default App;

