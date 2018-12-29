import { takeLatest, takeEvery } from "redux-saga/effects";

import * as actions from "../actions/actions";
import initialLoadToken from "./initialLoadToken";
import getAuthentication from "./getAuthentication";
import refreshAccessToken from "./refreshAccessToken";
import getOrders from "./getOrders";
import logoutUser from "./logoutUser";
import {getCart, getFavorite} from "./getFavoriteAndCart";
import getBooks from "./getBooks";
import getAuthors from "./getAuthors";
import getBookComments from "./getBookComments";
import createNewUser from "./createNewUser";
import * as cartFunctions from "./addDelCartOnServer";
import * as favoriteFunctions from "./addDelFavoriteOnServer";
import createNewBook from "./createNewBook";
import createNewComment from "./createNewComment";
import getBook from "./getBook";


export default function* saga() {
    yield takeLatest(actions.INITIAL_LOAD_TOKEN, initialLoadToken);
    yield takeEvery(actions.GET_AUTHENTICATION, getAuthentication);
    yield takeEvery(actions.REFRESH_ACCESS_TOKEN, refreshAccessToken);
    yield takeEvery(actions.GET_ORDERS, getOrders);
    yield takeEvery(actions.LOGOUT_USER, logoutUser);
    yield takeEvery(actions.GET_FAVORITE, getFavorite);
    yield takeEvery(actions.GET_CART, getCart);
    yield takeEvery(actions.GET_BOOKS, getBooks);
    yield takeEvery(actions.GET_BOOK, getBook);
    yield takeEvery(actions.GET_AUTHORS, getAuthors);
    yield takeEvery(actions.GET_BOOK_COMMENTS, getBookComments);
    yield takeEvery(actions.CREATE_NEW_USER, createNewUser);
    yield takeEvery(actions.ADD_TO_CART_ON_SERVER, cartFunctions.addToCartOnServer);
    yield takeEvery(actions.DELETE_FROM_CART_ON_SERVER, cartFunctions.deleteFromCartOnServer);
    yield takeEvery(actions.DELETE_ALL_CART_ON_SERVER, cartFunctions.deleteAllCartOnServer);
    yield takeEvery(actions.ADD_TO_FAVORITE_ON_SERVER, favoriteFunctions.addToFavoriteOnServer);
    yield takeEvery(actions.DELETE_FROM_FAVORITE_ON_SERVER, favoriteFunctions.deleteFromFavoriteOnServer);
    yield takeEvery(actions.DELETE_ALL_FAVORITE_ON_SERVER, favoriteFunctions.deleteAllFavoriteOnServer);
    yield takeEvery(actions.CREATE_NEW_BOOK, createNewBook);
    yield takeEvery(actions.CREATE_NEW_COMMENT, createNewComment);
 }
