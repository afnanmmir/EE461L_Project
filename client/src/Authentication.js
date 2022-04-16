import React, { useState } from "react";
import { Context } from "react";
import api from "./httpClient";
/**
 * Context object that contains the current authorization state of the app.
 * Contains a boolean for if it is authenticated
 * contains a user object that contains the user email
 * contains a method to set the isAuth boolean
 * contains a method to set the user email string
 * contains a method to attempt register the user
 * contains a method to attempt to log in the user
 * Video on React Contexts: https://youtu.be/OvM4hIxrqAw
 */
const AuthContext = React.createContext(
//     {
//     isAuth: localStorage.getItem("token") !== null ? true : false,
//     user: localStorage.getItem("user"),
//     setIsAuth:{},
//     setUser: {},
//     registerUser: {},
//     authenticateUser:{}
// }
)


/**
 * Allows use of the context object in other components
 * @returns the AuthContext
 */
export const useAuthContext = () =>{
    return React.useContext(AuthContext);
}
/**
 * Component that will wrap around the whole application to represent whether an authenticated user is using the app or not
 * @param {*} param0 
 * @returns AuthContextProvider component
 */
export const AuthContextProvider = ({children}) => {
    // const auth = AuthClass();
    // const [credentials, setCredentials] = useState(null);
    // State for whether user is authenticated or not. Will be used as a value for the context object
    const [isAuth, setIsAuth] = useState(AuthContext.isAuth);
    // State for the authenticated user email. Will be used as a value in the context object.
    const [user, setUser] = useState(AuthContext.user);
    console.log("THIS IS PRINTED");
    // Method to attempt to register a user's account. Will be used as a method in the context object.
    const registerUser = async(firstName, lastName, email, password) =>{
        try{
            let resp = await api().post("/users/register",{
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            //TODO: Actually send  data to the backend and database to see if user was successfully registered.
            console.log("This worked!");
            return {result:true,response:""};
        }catch(error){
            console.log(`Error Message ${error.message}`);
            return {result:false, response:"An account using this email already exists."}
        }
        
    }
    /**
     * function to attempt to authenticate a user.
     * @param {string} email 
     * @param {string} password 
     * @returns boolean whether user was authenticated and response object containing necessary data
     */
    const authenticateUser = async(email, password) => {
        try{
            let resp = await api().post("/users/login",{
                email: email,
                password: password
            }); // makes a POST request to the backend.
            // setIsAuth(true);
            // setUser(JSON.stringify(resp.data.user));
            // localStorage.setItem("token", JSON.stringify(resp.data.token));
            console.log("HELLO");
            // localStorage
            setUser(email);
            setIsAuth(true);
            return {result: true, response: resp};
        }catch(error){
            if(error.response.status === 401){
                return {result: false, response:"Password was incorrect"};
            }else{
                return {result: false, response:"Username does not exist."};
            }
        }
    }


    let val = {
        isAuth: isAuth,
        user: user,
        setIsAuth: setIsAuth,
        setUser: setUser,
        registerUser: registerUser,
        authenticateUser: authenticateUser
    }
    console.log('auth rerender: '+user);
    // creates AuthContext provider with given value for the context
    return (<AuthContext.Provider value={val}>
        {children}
    </AuthContext.Provider>);

}


//----------------------------------------------------- NOT USED-------------------------------------------------------------
export const AuthClass = () =>{

    const authenticateUser = ((username, password) =>{
        return true;
    });

    const registerUser = ((firstName, lastName, email, password) => {
        return true;
    });
    return({
        authenticateUser,
        registerUser
    });
}

