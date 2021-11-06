import {RootState} from "../../Interfaces";
import {ADD_BOOKS, ALL_BOOKS_NUMBER, IS_LOADING, IS_LOADING_ALL_BOOKS} from "../Actions/AcionsType";

let inicialState: RootState = {
    books: [],
    isLoading: false,
    totalBooks: 0,
    isLoadingAllBooks: false
}

export function BookReducer (state = inicialState, actions : any) {
    switch (actions.type) {
        case ADD_BOOKS :
            return {...state, books: actions.payload}
        case IS_LOADING :
            return {...state, isLoading: actions.payload}
        case IS_LOADING_ALL_BOOKS :
            return {...state, isLoadingAllBooks: actions.payload}
        case ALL_BOOKS_NUMBER :
            return  {...state, totalBooks: actions.payload}
        default :
            return state
    }
}