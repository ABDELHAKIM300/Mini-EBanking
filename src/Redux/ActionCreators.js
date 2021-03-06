import {createAction} from "redux-actions";
import {getAccounts, getTransfersList, login, logout, makeTransfer, signUp} from "../Services/Api";
import * as types from './ActionTypes';

export const loginAction = createAction(types.LOGIN, async obj => {
    return await login(obj);
});
export const logoutAction = createAction(types.LOGOUT,() => {
    return logout();
});
export const signUpAction = createAction(types.SIGNUP, async obj => {
    return await signUp(obj);
});
export const getAccountsAction = createAction(types.GETACCOUNTS, async obj => {
    return await getAccounts(obj);
});
export const makeTransferAction = createAction(types.MAKETRANSFER, async obj => {
    return await makeTransfer(obj);
});
export const getTransferListAction = createAction(types.GETTRANSFERLISTS, async obj => {
    return await getTransfersList(obj);
});