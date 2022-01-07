import axios from "axios";
import store from 'store'

const instance = axios.create({baseURL: "https://tnaebank.herokuapp.com/"});

// login
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

// remove user from storage
export const logout = () => {
    store.remove("user");
};

//sign up
export const signUp = data => {
    return instance
        .post("tna/ebankingService/signUp", data)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
};

// get the list of accounts
export const getAccounts = id => {
    return instance
        .get(`tna/ebankingService/users/${id}/accounts`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
};

// make new transfer
export const makeTransfer = data => {
    return instance
        .post("tna/ebankingService/transfer", data)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
};

//get the list of transfers
export const getTransfersList = id => {
    return instance
        .get(`tna/ebankingService/users/${id}/transfers`)
        .then(response => {
            return response.data;
        })
        .catch(err => {
            throw err;
        });
};