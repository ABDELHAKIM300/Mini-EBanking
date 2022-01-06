import * as ActionTypes from "./ActionTypes";
import store from 'store'
import {MAKETRANSFER} from "./ActionTypes";

const initialState = {
    user: store.get("user"),
    authenticated: false
};

export const Session = (state = initialState, action) => {
    let user;
    switch (action.type) {
        case ActionTypes.LOGOUT:
            store.remove("user");
            return {authenticated: false, user: null};

        case ActionTypes.LOGIN:
            if (!action.error) {
                user = action.payload.data
                store.set("user", user);
                return {user, authenticated: true};
            }
            return {...state, user, authenticated: false};

        case ActionTypes.SIGNUP:
            if (!action.error) {
                user = action.payload.data
                store.set("user", user);
                return {user, authenticated: true};
            }
            return {...state, user, authenticated: false};

        default:
            return state;
    }
}

export const Data = (state = {accounts: [], transfers: []}, action) => {
    switch (action.type) {
        case ActionTypes.GETACCOUNTS:
            if (!action.error) {
                const accounts = action.payload.data;
                return {...state, accounts: accounts};
            }
            return state;
        case ActionTypes.MAKETRANSFER:
            if (!action.error) {
                const transfer = action.payload.data;
                // update the debit account balance after transfer
                const accounts = state.accounts.map(account => {
                    if (account.accountNumber === transfer.debitAccount) {
                        const newSolde = account.solde - transfer.amount;
                        return {...account, solde: newSolde};
                    }
                    return account;
                });
                return {accounts, transfers: [...state.transfers, transfer]};
            }
            return state;
        default:
            return state;
    }
}