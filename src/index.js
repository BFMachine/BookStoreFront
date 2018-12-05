import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import './index.css';

import * as serviceWorker from './serviceWorker';
import App from "./components/App/App";
import DevTools from "./components/DevTools/DevTools";
import reducer from "./reducers/redusers";
import saga from "./saga";
import { actionInitialLoadToken } from "./actions/actions";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//export const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));
const enhancer = compose(
    applyMiddleware(logger, sagaMiddleware),
    DevTools.instrument()
);

export const store = createStore(reducer, enhancer);
sagaMiddleware.run(saga); 

store.dispatch( actionInitialLoadToken() );  

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div> {/* DEbug wrapper div for devtools */}
        <App /> 
        <DevTools />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
