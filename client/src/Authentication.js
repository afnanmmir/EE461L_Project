import React from "react";
import { Context } from "react";

const AuthContext = React.createContext()

export const useAuthContext = () =>{
    return React.useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const auth = AuthClass();
    return (<AuthContext.Provider value={auth}>
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

