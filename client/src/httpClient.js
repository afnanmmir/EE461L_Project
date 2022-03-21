import axios from "axios";

const api = () =>{
    const TOKEN = `Bearer ${localStorage.getItem("token")}`;
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