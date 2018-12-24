export const SET_TOKENS = "SET_TOKENS";
export const SET_AUTHENTICATION_ERROR = "SET_AUTHENTICATION_ERROR";
export const SET_AUTH_USER = "SET_AUTH_USER";
export const SET_ORDERS = "SET_ORDERS";
export const SET_COMMENTS = "SET_COMMENTS";
export const SET_CART = "SET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const SET_FAVORITE = "SET_FAVORITE";
export const ADD_TO_FAVORITE = "ADD_TO_FAVORITE";
export const DELETE_FROM_FAVORITE = "DELETE_FROM_FAVORITE";
export const SET_BOOKS = "SET_BOOKS";
export const ADD_BOOK_TO_CAСH = "ADD_BOOK_TO_CAСH";
export const SET_AUTHORS = "SET_AUTHORS";
export const SET_FILTER_CATEGORY = "SET_FILTER_CATEGORY";
export const SET_FILTER_RANK = "SET_FILTER_RANK";
export const SET_FILTER_AUTHOR = "SET_FILTER_AUTHOR";
export const SET_FILTER_SORT = "SET_FILTER_SORT";
export const SET_FILTER_SORT_DIRECTION = "SET_FILTER_SORT_DIRECTION";
export const SET_PAGE_TOTAL = "SET_PAGE_TOTAL";
export const SET_PAGE_SIZE = "SET_PAGE_SIZE";
export const SET_PAGE_CURRENT = "SET_PAGE_CURRENT";
export const SET_SEARCH_MODE = "SET_SEARCH_MODE";
export const SET_SEARCH_STRING = "SET_SEARCH_STRING";

// for saga 
export const INITIAL_LOAD_TOKEN = "INITIAL_LOAD_TOKEN";
export const GET_AUTHENTICATION = "GET_AUTHENTICATION";
export const REFRESH_ACCESS_TOKEN = "REFRESH_ACCESS_TOKEN";
export const GET_ORDERS = "GET_ORDERS";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_CART = "GET_CART";
export const GET_FAVORITE = "GET_FAVORITE";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOK = "GET_BOOK";
export const GET_AUTHORS = "GET_AUTHORS";
export const GET_BOOK_COMMENTS = "GET_BOOK_COMMENTS";
export const CREATE_NEW_USER = "CREATE_NEW_USER";
export const ADD_TO_CART_ON_SERVER = "ADD_TO_CART_ON_SERVER";
export const DELETE_FROM_CART_ON_SERVER = "DELETE_FROM_CART_ON_SERVER";
export const DELETE_ALL_CART_ON_SERVER = "DELETE_ALL_CART_ON_SERVER";
export const ADD_TO_FAVORITE_ON_SERVER = "ADD_TO_FAVORITE_ON_SERVER";
export const DELETE_FROM_FAVORITE_ON_SERVER = "DELETE_FROM_FAVORITE_ON_SERVER";
export const DELETE_ALL_FAVORITE_ON_SERVER = "DELETE_ALL_FAVORITE_ON_SERVER";
export const CREATE_NEW_BOOK = "CREATE_NEW_BOOK";
export const CREATE_NEW_COMMENT = "CREATE_NEW_COMMENT";

// const
export const CATEGORY_ALL = "0";
export const CATEGORY_CLASSIC = "1";
export const CATEGORY_FANTASY = "2";
export const CATEGORY_ADVENTURE = "3";
export const CATEGORY_DETECTIVE = "4";
export const CATEGORY_FICTION = "5";
export const CATEGORY_SCIENTIFIC = "6";
export const CATEGORY_CHILDREN = "7";

export const RANK_ALL = "";
export const RANK_1 = "one";
export const RANK_2 = "two";
export const RANK_3 = "three";
export const RANK_4 = "four";
export const RANK_5 = "five";

export const SORT_BY_ALL = "";
export const SORT_BY_PRICE = "price";
export const SORT_BY_RANK = "rank";
export const SORT_BY_AUTHOR = "author";


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

export function actionSetComments(payload) {
    return {
        type: SET_COMMENTS,
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

export function actionAddBookToCash(book) {
    return {
        type: ADD_BOOK_TO_CAСH,
        book
    };
}

export function actionSetAuthors(authors) {
    return {
        type: SET_AUTHORS,
        authors
    };
}

export function actionGetBooks() {
    return {
        type: GET_BOOKS
    };
}

export function actionGetBook(book_id) {
    return {
        type: GET_BOOK,
        book_id
    };
}

export function actionGetAuthors() {
    return {
        type: GET_AUTHORS
    };
}

export function actionGetBookComments(id) {
    return {
        type: GET_BOOK_COMMENTS,
        id
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

export function actionCreateNewBook(title, author, description, price, rank, category, coverFile, fragmentFile) {
    return {
        type: CREATE_NEW_BOOK,
        title,
        author,
        description,
        price,
        rank,
        category,
        coverFile,
        fragmentFile
    };
}

export function actionCreateNewComment(book_id, commenter_name, content) {
    return {
        type: CREATE_NEW_COMMENT,
        book_id,
        commenter_name,
        content
    };
}

export function actionSetFilterCategory(filter_params) {
    return {
        type: SET_FILTER_CATEGORY,
        filter_params
    };
}

export function actionSetFilterRank(filter_params) {
    return {
        type: SET_FILTER_RANK,
        filter_params
    };
}

export function actionSetFilterAuthor(filter_params) {
    return {
        type: SET_FILTER_AUTHOR,
        filter_params
    };
}

export function actionSetFilterSort(sort) {
    return {
        type: SET_FILTER_SORT,
        sort,
    };
}

export function actionSetFilterSortDirection(direction) {
    return {
        type: SET_FILTER_SORT_DIRECTION,
        direction
    };
}

export function actionSetPageTotal(pages) {
    return {
        type: SET_PAGE_TOTAL,
        pages
    };
}

export function actionSetPageSize(size) {
    return {
        type: SET_PAGE_SIZE,
        size
    };
}

export function actionSetPageCurrent(page) {
    return {
        type: SET_PAGE_CURRENT,
        page
    };
}

export function actionSetSearchMode(search) {
    return {
        type: SET_SEARCH_MODE,
        search
    };
}

export function actionSetSearchString(string) {
    return {
        type: SET_SEARCH_STRING,
        string
    };
}
