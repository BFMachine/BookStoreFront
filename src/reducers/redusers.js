import { combineReducers } from "redux";

import { SET_TOKENS, SET_AUTHENTICATION_ERROR, SET_AUTH_USER, SET_ORDERS } from "../actions/actions";

function tokens(state = { accessToken: "", refreshToken: "" }, action) {
  switch(action.type) {
    case SET_TOKENS:

      return {
        accessToken: action.tokens.accessToken,
        refreshToken: action.tokens.refreshToken
      };

      default:
        return state;  
    }
}

const initialAuthState = {
    responseError: false, 
    message: "", 
    id: null,
    email: "", 
    role: "user",
    authorized: false 
};

function authentications(state = initialAuthState, action) {

  switch(action.type) {
    case SET_AUTHENTICATION_ERROR:
      return { ...state,
        message: action.message
      };

    case SET_AUTH_USER:
      return {...state,
        authorized: action.authorized,
        id: action.id,
        email: action.email,
        role: action.role
      };

      default:
        return state;  
    }
}

function orders(state = { orders: null }, action) {

  switch(action.type) {
    case SET_ORDERS:
      return {...action.payload};
  
    default:
        return state;  
  }
}

export default combineReducers({
    tokens,
    authentications,
    orders
});
