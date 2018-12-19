import { combineReducers } from "redux";

import { SET_TOKENS, SET_AUTHENTICATION_ERROR, SET_AUTH_USER, SET_ORDERS,
  SET_CART, ADD_TO_CART, SET_FAVORITE, SET_BOOKS, DELETE_FROM_CART, ADD_TO_FAVORITE, 
  DELETE_FROM_FAVORITE , SET_COMMENTS, SET_FILTER_CATEGORY, SET_FILTER_RANK,
  SET_FILTER_AUTHOR, SET_AUTHORS, SET_PAGE_TOTAL, SET_PAGE_SIZE, SET_PAGE_CURRENT,
  SET_FILTER_SORT, SET_FILTER_SORT_DIRECTION, ADD_BOOK_TO_CAСH, CATEGORY_ALL,
  RANK_ALL, SORT_BY_ALL,
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

function authors(state = [], action) {

  switch(action.type) {
    case SET_AUTHORS:
      return [...action.authors];
  
    default:
        return state;  
  }
}

function filter(state = {
  category: CATEGORY_ALL,
  rank: RANK_ALL,
  author: "",
  sort: SORT_BY_ALL,
  direction: "ASC"
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

    case SET_FILTER_AUTHOR:
      return {...state,
        author: action.filter_params
      };
  
    case SET_FILTER_SORT:
      return {...state,
        sort: action.sort,
      };

    case SET_FILTER_SORT_DIRECTION:
      return {...state,
        direction: action.direction,
      };

    default:
        return state;  
  }
}


function pages(state = {
  pages: 1,
  page: 1,
  size: 4
}, action) {

  switch(action.type) {
    case SET_PAGE_TOTAL:
      return {...state,
        pages: action.pages
      };

    case SET_PAGE_SIZE:
      return {...state,
        size: action.size
      };

    case SET_PAGE_CURRENT:
      return {...state,
        page: action.page
      };
  
    default:
        return state;  
  }
}

function cach(state = [], action) {

  switch(action.type) {
    case ADD_BOOK_TO_CAСH:
      return [...state, action.book];
  
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
    authors,
    filter,
    pages,
    cach
});
