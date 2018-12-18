import { combineReducers } from "redux";

import { SET_TOKENS, SET_AUTHENTICATION_ERROR, SET_AUTH_USER, SET_ORDERS,
  SET_CART, ADD_TO_CART, SET_FAVORITE, SET_BOOKS, DELETE_FROM_CART, ADD_TO_FAVORITE, 
  DELETE_FROM_FAVORITE , SET_COMMENTS, SET_FILTER_CATEGORY, SET_FILTER_RANK
} from "../actions/actions";

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
        role: action.role,
        full_name: action.full_name,
        address: action.address,
        phone: action.phone
      };

      default:
        return state;  
    }
}

function orders(state = [], action) {

  switch(action.type) {
    case SET_ORDERS:
      return [...action.payload];
  
    default:
        return state;  
  }
}


function comments(state = [], action) {

  switch(action.type) {
    case SET_COMMENTS:
      return [...action.payload];
  
    default:
        return state;  
  }
}

function cart(state = [], action) {

  switch(action.type) {
    case SET_CART:
      return [...action.cart];

    case ADD_TO_CART:
      return [...state, 
        action.book
      ];

    case DELETE_FROM_CART:
      return [
        ...state.filter(item => action.book.id !== item.id)
      ];  

    default:
        return state;  
  }
}

function favorite(state = [], action) {

  switch(action.type) {
    case SET_FAVORITE:
      return [...action.favorite];

    case ADD_TO_FAVORITE:
      return [...state,
        action.book
      ];

    case DELETE_FROM_FAVORITE:
      return [
        ...state.filter(item => action.book.id !== item.id)
      ];  

    default:
        return state;  
  }
}

function books(state = [], action) {

  switch(action.type) {
    case SET_BOOKS:
      return [...action.books];
  
    default:
        return state;  
  }
}

function filter(state = {
  category: 0,
  rank: "0"
}, action) {

  switch(action.type) {
    case SET_FILTER_CATEGORY:
      return {...state,
        category: action.filter_params
      };

    case SET_FILTER_RANK:
      return {...state,
        rank: action.filter_params
      };
  
    default:
        return state;  
  }
}



export default combineReducers({
    tokens,
    authentications,
    orders,
    comments,
    cart,
    favorite,
    books,
    filter
});
