import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

import './normalize.css';
import App from "./components/App/App";

import store from "./store/store";
import history from "./modules/history";

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}> 
      <React.Fragment>
        <App /> 
        {/*<DevTools />*/}
      </React.Fragment>
    </Router>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
