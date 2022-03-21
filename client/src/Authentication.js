import React, { useState } from "react";
import { Context } from "react";
import api from "./httpClient";

const AuthContext = React.createContext({
    isAuth: localStorage.getItem("token") !== null ? true : false,
    user: localStorage.getItem("user"),
    setIsAuth:{},
    setUser: {},
    registerUser: {},
    authenticateUser:{}
})

export const useAuthContext = () =>{
    return React.useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    // const auth = AuthClass();
    // const [credentials, setCredentials] = useState(null);
    const [isAuth, setIsAuth] = useState(AuthContext.isAuth);
    const [user, setUser] = useState(AuthContext.user);
    console.log("THIS IS PRINTED");

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

    const authenticateUser = async(email, password) => {
        try{
            let resp = await api().post("/users/login",{
                email: email,
                password: password
            });
            // setIsAuth(true);
            // setUser(JSON.stringify(resp.data.user));
            // localStorage.setItem("token", JSON.stringify(resp.data.token));
            console.log("HELLO")
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


    return (<AuthContext.Provider value={val}>
        {children}
    </AuthContext.Provider>);

}

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

