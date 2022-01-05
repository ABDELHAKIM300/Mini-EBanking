import {createAction} from "redux-actions";
import {login} from "../Services/Api";
import * as types from './ActionTypes';

export const loginAction = createAction(types.LOGIN, async obj => {
    return await login(obj);
});