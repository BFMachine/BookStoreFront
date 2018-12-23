import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';

import './normalize.css';
import App from "./components/App/App";

import store from "./store/store";

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <App /> 
        {/*<DevTools />*/}
      </React.Fragment>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
