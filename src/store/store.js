import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { actionInitialLoadToken } from "../actions/actions";
import reducer from "../reducers/redusers";
import saga from "../saga";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/*export const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));
const enhancer = compose(
    applyMiddleware(logger, sagaMiddleware),
    DevTools.instrument()
);
*/

const store = createStore(reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga); 
store.dispatch( actionInitialLoadToken() );  

export default store;
