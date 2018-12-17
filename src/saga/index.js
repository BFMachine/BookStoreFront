import { takeLatest, takeEvery } from "redux-saga/effects";
import { INITIAL_LOAD_TOKEN, GET_AUTHENTICATION, REFRESH_ACCESS_TOKEN, 
    GET_ORDERS, LOGOUT_USER, GET_CART, GET_FAVORITE, GET_BOOKS,
    CREATE_NEW_USER, ADD_TO_CART_ON_SERVER, DELETE_FROM_CART_ON_SERVER,
    DELETE_ALL_CART_ON_SERVER, ADD_TO_FAVORITE_ON_SERVER, DELETE_FROM_FAVORITE_ON_SERVER,
    DELETE_ALL_FAVORITE_ON_SERVER, CREATE_NEW_BOOK, GET_BOOK_COMMENTS, CREATE_NEW_COMMENT
} from "../actions/actions";
import initialLoadToken from "./initialLoadToken";
import getAuthentication from "./getAuthentication";
import refreshAccessToken from "./refreshAccessToken";
import getOrders from "./getOrders";
import logoutUser from "./logoutUser";
import {getCart, getFavorite} from "./getFavoriteAndCart";
import getBooks from "./getBooks";
import getBookComments from "./getBookComments";
import createNewUser from "./createNewUser";
import { addToCartOnServer, deleteFromCartOnServer, deleteAllCartOnServer 
} from "./addDelCartOnServer";
import { addToFavoriteOnServer, deleteFromFavoriteOnServer, deleteAllFavoriteOnServer 
} from "./addDelFavoriteOnServer";
import createNewBook from "./createNewBook";
import createNewComment from "./createNewComment";


export default function* saga() {
    yield takeLatest(INITIAL_LOAD_TOKEN, initialLoadToken);
    yield takeEvery(GET_AUTHENTICATION, getAuthentication);
    yield takeEvery(REFRESH_ACCESS_TOKEN, refreshAccessToken);
    yield takeEvery(GET_ORDERS, getOrders);
    yield takeEvery(LOGOUT_USER, logoutUser);
    yield takeEvery(GET_FAVORITE, getFavorite);
    yield takeEvery(GET_CART, getCart);
    yield takeEvery(GET_BOOKS, getBooks);
    yield takeEvery(GET_BOOK_COMMENTS, getBookComments);
    yield takeEvery(CREATE_NEW_USER, createNewUser);
    yield takeEvery(ADD_TO_CART_ON_SERVER, addToCartOnServer);
    yield takeEvery(DELETE_FROM_CART_ON_SERVER, deleteFromCartOnServer);
    yield takeEvery(DELETE_ALL_CART_ON_SERVER, deleteAllCartOnServer);
    yield takeEvery(ADD_TO_FAVORITE_ON_SERVER, addToFavoriteOnServer);
    yield takeEvery(DELETE_FROM_FAVORITE_ON_SERVER, deleteFromFavoriteOnServer);
    yield takeEvery(DELETE_ALL_FAVORITE_ON_SERVER, deleteAllFavoriteOnServer);
    yield takeEvery(CREATE_NEW_BOOK, createNewBook);
    yield takeEvery(CREATE_NEW_COMMENT, createNewComment);
 }
