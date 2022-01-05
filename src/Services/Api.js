import axios from "axios";


const instance = axios.create({baseURL: "https://tnaebank.herokuapp.com/"});


export const login = data => {
    return instance
        .post("tna/ebankingService/signIn", data)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
};