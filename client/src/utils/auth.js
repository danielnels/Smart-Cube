// use this to decode a token and get the user's information out of it
import decode from "jwt-decode";
import { store } from "../redux/store";
import { userActions, } from "../redux/actions/";

class AuthService {
    // get user data from encoded token
    getProfile() {
        return decode(this.getToken());
    }

    // check if user's logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    // check if token is expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
    }

    login(idToken, id, username, email, isVerified,) {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
        //add user data to redux state on login
        store.dispatch(
            userActions.loginRedux(
                id,
                username,
                email,
                isVerified,
               
            )
        );
    }

    async logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
        //update redux store removing logged in users data
        await store.dispatch(userActions.logoutRedux());
       
        // this will reload the page and reset the state of the application, a no-no for react, unless for logout to refresh user experience
        setTimeout(() => {
            window.location.assign("/");
        }, 100);
    }
}

// create a new class to instantiate for a user
export default new AuthService();
