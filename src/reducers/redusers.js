import { combineReducers } from "redux";

import { SET_TOKENS } from "../actions/actions";


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

export default combineReducers({
    tokens
});