import { combineReducers } from "redux";

import { SET_TOKENS, SET_AUTHENTICATION, SET_AUTH_USER } from "../actions/actions";

function tokens(state = { accessToken: "", refreshToken: "" }, action) {
  switch(action.type) {
    case SET_TOKENS:

      return {
        accessToken: action.tokens.accessToken,
        refreshToken: action.tokens.refreshToken
      }

      default:
        return state;  
    }
}

function authentications(state = { 
      responseError: false, 
      message: "", 
      email: "", 
      role: "user",
      authorized: false 
    }, action) {

  switch(action.type) {
    case SET_AUTHENTICATION:

      return { ...state,
        responseError: action.responseError,
        message: action.message
      }

    case SET_AUTH_USER:

      return {...state,
        authorized: action.authorized,
        email: action.email,
        role: action.role
      }

      default:
        return state;  
    }
}

export default combineReducers({
    tokens,
    authentications
});