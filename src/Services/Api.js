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