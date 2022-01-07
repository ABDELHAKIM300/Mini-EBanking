import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import * as reducers from './Reducers';
import promiseMiddleware from 'redux-promise';



export const ConfigureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            session: reducers.Session,
            data: reducers.Data,
        }),
        composeEnhancers(
            applyMiddleware(promiseMiddleware)
        ));
    return store;
}
