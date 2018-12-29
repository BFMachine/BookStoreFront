import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { actionInitialLoadToken } from "../actions/actions";
import reducer from "../reducers/reducers";
import saga from "../saga";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga); 
store.dispatch( actionInitialLoadToken() );  

export default store;
