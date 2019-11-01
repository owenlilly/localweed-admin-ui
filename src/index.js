import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from "./rootReducer"
import './index.css';
import mySaga from "./app/sagas";
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers(rootReducer), composeEnhancers(

    applyMiddleware(sagaMiddleware)
))
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

sagaMiddleware.run(mySaga)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
