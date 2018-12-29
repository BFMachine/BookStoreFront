import { combineReducers } from "redux";

import * as actions from "../actions/actions";

function tokens(state = { accessToken: "", refreshToken: "" }, action) {
  switch(action.type) {
    case actions.SET_TOKENS:

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
    case actions.SET_AUTHENTICATION_ERROR:
      return { ...state,
        message: action.message
      };

    case actions.SET_AUTH_USER:
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
    case actions.SET_ORDERS:
      return [...action.payload];
  
    default:
        return state;  
  }
}


function comments(state = [], action) {
  switch(action.type) {
    case actions.SET_COMMENTS:
      return [...action.payload];
  
    default:
        return state;  
  }
}

function cart(state = [], action) {
  switch(action.type) {
    case actions.SET_CART:
      return [...action.cart];

    case actions.ADD_TO_CART:
      return [...state, 
        action.book
      ];

    case actions.DELETE_FROM_CART:
      return [
        ...state.filter(item => action.book.id !== item.id)
      ];  

    default:
        return state;  
  }
}

function favorite(state = [], action) {
  switch(action.type) {
    case actions.SET_FAVORITE:
      return [...action.favorite];

    case actions.ADD_TO_FAVORITE:
      return [...state,
        action.book
      ];

    case actions.DELETE_FROM_FAVORITE:
      return [
        ...state.filter(item => action.book.id !== item.id)
      ];  

    default:
        return state;  
  }
}

function books(state = [], action) {
  switch(action.type) {
    case actions.SET_BOOKS:
      return [...action.books];
  
    default:
        return state;  
  }
}

function authors(state = [], action) {
  switch(action.type) {
    case actions.SET_AUTHORS:
      return [...action.authors];
  
    default:
        return state;  
  }
}

function filter(state = {
  category: actions.CATEGORY_ALL,
  rank: actions.RANK_ALL,
  author: "",
  sort: actions.SORT_BY_ALL,
  direction: "ASC"
}, action) {
  switch(action.type) {
    case actions.SET_FILTER_CATEGORY:
      return {...state,
        category: action.filter_params
      };

    case actions.SET_FILTER_RANK:
      return {...state,
        rank: action.filter_params
      };

    case actions.SET_FILTER_AUTHOR:
      return {...state,
        author: action.filter_params
      };
  
    case actions.SET_FILTER_SORT:
      return {...state,
        sort: action.sort,
      };

    case actions.SET_FILTER_SORT_DIRECTION:
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
  size: 4,
  lazy: false
}, action) {

  switch(action.type) {
    case actions.SET_PAGE_TOTAL:
      return {...state,
        pages: action.pages
      };

    case actions.SET_PAGE_SIZE:
      return {...state,
        size: action.size
      };

    case actions.SET_PAGE_CURRENT:
      return {...state,
        page: action.page
      };

    case actions.SET_PAGE_LAZY:
      return {...state,
        lazy: action.lazy
      };

    default:
        return state;  
  }
}

function cache(state = [], action) {
  switch(action.type) {
    case actions.ADD_BOOK_TO_CACHE:
      return [...state, action.book];
  
    default:
        return state;  
  }
}

function search(state = {search: false, string: ""}, action) {
  switch(action.type) {
    case actions.SET_SEARCH_MODE:
      return {...state,
        search: action.search
      };

    case actions.SET_SEARCH_STRING:
      return {...state,
        string: action.string
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
    authors,
    filter,
    pages,
    cache,
    search
});
