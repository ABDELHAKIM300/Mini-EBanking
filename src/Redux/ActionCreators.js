import {createAction} from "redux-actions";
import {getAccounts, login, makeTransfer, signUp} from "../Services/Api";
import * as types from './ActionTypes';

export const loginAction = createAction(types.LOGIN, async obj => {
    return await login(obj);
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