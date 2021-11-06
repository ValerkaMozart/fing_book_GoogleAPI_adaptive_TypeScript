import axios from "axios";
import {IState} from "../../components/HomePage/HomePage";
import {ADD_BOOKS, ALL_BOOKS_NUMBER, IS_LOADING, IS_LOADING_ALL_BOOKS} from "./AcionsType";


let API_KEY = 'AIzaSyDyXCJFmlLKOPvI3sTJ7LSd7gug5ajymew'


export function booksSearch(searchData: IState) {

    return async (dispatch: Function) => {
        try {
            dispatch(isLoadingProcess(true))
            dispatch(isLoadingAllBooks(true))
            dispatch(addAllBooksNumber(0))
            dispatch(addToBooks([]))
            let {inputValue, sort} = searchData
            let response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&startIndex=0&maxResults=40&orderBy=${sort}&key=${API_KEY}`
            )
            let state: IState = response.data.items.filter((a: any) => {
                let categories = a.volumeInfo.categories || ['Пусто']
                if (categories.join().toLowerCase().indexOf(searchData.categories) >= 0) {
                    return a
                }

            })
            dispatch(addToBooks(searchData.categories === 'all' ? response.data.items : state))
            dispatch(autoDownloadBooks(searchData, 0))
            dispatch(isLoadingProcess(false))
        } catch (err) {
            console.log(err)
        }
    }
}

export function autoDownloadBooks (searchData: IState, index: number) {
    return async (dispatch: Function, getState: Function) => {
        try {
            let store = getState().Books.books
            let {inputValue, sort} = searchData
            let startIndex = index + 40
            let response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&startIndex=${startIndex}&maxResults=40&orderBy=${sort}&key=${API_KEY}`
            )
            let state: any = response.data.items.filter((a: any) => {
                let categories = a.volumeInfo.categories || ['Пусто']
                if (categories.join().toLowerCase().indexOf(searchData.categories) >= 0) {
                    return a
                }

            })
            let endBooksData = [...store, ...searchData.categories === 'all' ? response.data.items : state]
            dispatch(addToBooks(endBooksData))
            dispatch(autoDownloadBooks(searchData, startIndex))
        }
        catch (err) {
            console.log(err)
            let store = getState().Books.books
            dispatch(addAllBooksNumber(store.length + 1))
            dispatch(isLoadingProcess(false))
            dispatch(isLoadingAllBooks(false))
        }
    }
}

export function isLoadingAllBooks (isLoadingAllBooks: boolean) {
    return {
        type: IS_LOADING_ALL_BOOKS,
        payload: isLoadingAllBooks
    }
}

export function addAllBooksNumber(allBooks: number) {
    return {
        type: ALL_BOOKS_NUMBER,
        payload: allBooks
    }
}

export function addToBooks(booksArray: Array<object>) {
    return {
        type: ADD_BOOKS,
        payload: booksArray
    }
}


export function isLoadingProcess(isLoading: boolean) {
    return {
        type: IS_LOADING,
        payload: isLoading
    }
}