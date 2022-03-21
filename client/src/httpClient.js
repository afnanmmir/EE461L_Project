/**
 * httpClient is the axios instance that is used to make requests from the front end to the back end
 */
import axios from "axios";
/**
 * Method that returns an axios object that will connect to the backend
 * @returns the axios object
 */
const api = () =>{
    const TOKEN = `Bearer ${localStorage.getItem("token")}`; // If an authenticated user is using the app, they will have a token that will allow them to access projects and datasets.
    if(TOKEN != "Bearer null"){
        axios.defaults.headers.common['Authorization'] = TOKEN;
        // console.log(TOKEN);
    }
    let api = axios.create({
        baseURL:"http://127.0.0.1:5000/",
        responseType:"json"
    });

    return api;
}

export default api;