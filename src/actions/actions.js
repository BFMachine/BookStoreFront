export const SET_TOKENS = "SET_TOKENS";
export const SET_AUTHENTICATION_ERROR = "SET_AUTHENTICATION_ERROR";
export const SET_AUTH_USER = "SET_AUTH_USER";
export const SET_ORDERS = "SET_ORDERS";
export const SET_CART = "SET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const SET_FAVORITE = "SET_FAVORITE";

export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const DELETE_FROM_FAVORITE = "DELETE_FROM_FAVORITE";

export const SET_BOOKS = "SET_BOOKS";

// for saga 
export const INITIAL_LOAD_TOKEN = "INITIAL_LOAD_TOKEN";
export const GET_AUTHENTICATION = "GET_AUTHENTICATION";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";
export const GET_ORDERS = "GET_ORDERS";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_CART = "GET_CART";
export const GET_FAVORITE = "GET_FAVORITE";
export const GET_BOOKS = "GET_BOOKS";
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const ADD_TO_CART_ON_SERVER = "ADD_TO_CART_ON_SERVER";
export const DELETE_FROM_CART_ON_SERVER = "DELETE_FROM_CART_ON_SERVER";
export const DELETE_ALL_CART_ON_SERVER = "DELETE_ALL_CART_ON_SERVER";

export const ADD_TO_FAVORITE_ON_SERVER = "ADD_TO_FAVORITE_ON_SERVER";
export const DELETE_FROM_FAVORITE_ON_SERVER = "DELETE_FROM_FAVORITE_ON_SERVER";
export const DELETE_ALL_FAVORITE_ON_SERVER = "DELETE_ALL_FAVORITE_ON_SERVER";

export function actionSetTokens(tokens) {
    return {
        type: SET_TOKENS,
        tokens
    };
}

export function actionInitialLoadToken() {
    return {
        type: INITIAL_LOAD_TOKEN
    };
}

export function actionGetAuthentication(email, password ) {
    return {
        type: GET_AUTHENTICATION,
        email,
        password
    };
}

export function actionSetAuthenticationError(message) {
    return {
        type: SET_AUTHENTICATION_ERROR,
        message
    };
}

export function actionRefreshAccessToken() {
    return {
        type: REFRESH_ACCESS_TOKEN
    };
}

export function actionSetAuthUser(
    authorized, 
    id = null, 
    email = "", 
    role = "", 
    full_name = "",
    address = "",
    phone = ""
    ) {
    return {
        type: SET_AUTH_USER,
        authorized, 
        id,
        email,
        role,
        full_name,
        address,
        phone
    };
}

export function actionSetOrders(payload) {
    return {
        type: SET_ORDERS,
        payload
    };
}

export function actionGetOrders() {
    return {
        type: GET_ORDERS
    };
}

export function actionLogoutUser() {
    return {
        type: LOGOUT_USER
    };
}

export function actionSetCart(cart) {
    return {
        type: SET_CART,
        cart
    };
}

export function actionAddToCart(book) {
    return {
        type: ADD_TO_CART,
        book
    };
}

export function actionAddToCartOnServer(book) {
    return {
        type: ADD_TO_CART_ON_SERVER,
        book
    };
}

export function actionDeleteFromCart(book) {
    return {
        type: DELETE_FROM_CART,
        book
    };
}

export function actionDeleteFromCartOnServer(book) {
    return {
        type: DELETE_FROM_CART_ON_SERVER,
        book
    };
}

export function actionDeleteAllCartOnServer() {
    return {
        type: DELETE_ALL_CART_ON_SERVER
    };
}

export function actionSetFavorite(favorite) {
    return {
        type: SET_FAVORITE,
        favorite
    };
}

export function actionAddToFavorite(book) {
    return {
        type: ADD_TO_FAVORITE,
        book
    };
}

export function actionAddToFavoriteOnServer(book) {
    return {
        type: ADD_TO_FAVORITE_ON_SERVER,
        book
    };
}

export function actionDeleteFromFavorite(book) {
    return {
        type: DELETE_FROM_FAVORITE,
        book
    };
}

export function actionDeleteFromFavoriteOnServer(book) {
    return {
        type: DELETE_FROM_FAVORITE_ON_SERVER,
        book
    };
}

export function actionDeleteAllFavoriteOnServer() {
    return {
        type: DELETE_ALL_FAVORITE_ON_SERVER
    };
}






export function actionGetFavorite() {
    return {
        type: GET_FAVORITE
    };
}

export function actionGetCart() {
    return {
        type: GET_CART
    };
}

export function actionSetBooks(books) {
    return {
        type: SET_BOOKS,
        books
    };
}

export function actionGetBooks() {
    return {
        type: GET_BOOKS
    };
}

export function actionCreateNewUser(name, email, password, address, phone, role = "user") {
    return {
        type: CREATE_NEW_USER,
        name,
        email,
        password,
        address,
        phone,
        role
    };
}
