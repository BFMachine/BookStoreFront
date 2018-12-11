import { takeLatest, takeEvery } from "redux-saga/effects";
import { INITIAL_LOAD_TOKEN, GET_AUTHENTICATION, REFRESH_ACCESS_TOKEN, 
    GET_ORDERS, LOGOUT_USER, GET_CART, GET_FAVORITE, GET_BOOKS,
    CREATE_NEW_USER, ADD_TO_CART_ON_SERVER
} from "../actions/actions";

import initialLoadToken from "./initialLoadToken";
import getAuthentication from "./getAuthentication";
import refreshAccessToken from "./refreshAccessToken";
import getOrders from "./getOrders";
import logoutUser from "./logoutUser";
import {getCart, getFavorite} from "./getFavoriteAndCart";
import getBooks from "./getBooks";
import createNewUser from "./createNewUser";
import addToCartOnServer from "./addToCartOnServer";

export default function* saga() {
    yield takeLatest(INITIAL_LOAD_TOKEN, initialLoadToken);
    yield takeEvery(GET_AUTHENTICATION, getAuthentication);
    yield takeEvery(REFRESH_ACCESS_TOKEN, refreshAccessToken);
    yield takeEvery(GET_ORDERS, getOrders);
    yield takeEvery(LOGOUT_USER, logoutUser);
    yield takeEvery(GET_FAVORITE, getFavorite);
    yield takeEvery(GET_CART, getCart);
    yield takeEvery(GET_BOOKS, getBooks);
    yield takeEvery(CREATE_NEW_USER, createNewUser);
    yield takeEvery(ADD_TO_CART_ON_SERVER, addToCartOnServer);
}
