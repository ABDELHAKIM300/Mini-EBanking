import * as ActionTypes from "./ActionTypes";
import store from 'store'

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
        default:
            return state;
    }
}