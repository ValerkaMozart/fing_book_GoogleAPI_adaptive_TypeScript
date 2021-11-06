import React, {useState} from "react"
import classes from './HomePage.module.scss'
import {connect} from "react-redux"
import {booksSearch} from "../../Redux/Actions/BooksActions";
import RenderedBooks from "./RenderedBooks/RenderedBooks";
import Pages from "./Pages/Pages";
import CSSLoader from "./CSSLoader/CSSLoader";
import ArrowPagination from "./RenderedBooks/ArrowPagination/ArrowPagination";

export interface IState {
    inputValue: string,
    categories: string,
    sort: string
}

interface propsComponent {
    books: Array<object>,
    totalBooks: number,
    isLoading: boolean,
    isLoadingAllBooks: boolean

    searchBooks(data: object): object
}


let HomePage: React.FC<propsComponent> = props => {
    let optionsValue: Array<string> = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry']
    let [state, setState] = useState<IState>({
        inputValue: '',
        categories: 'all',
        sort: 'relevance'
    })

    let enterInputHandler = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Enter' && state.inputValue) {
            props.searchBooks(state)
            setNowPagePagination(1)
        }
    }

    let searchToggle = () => {
        if (state.inputValue) {
            props.searchBooks(state)
            setNowPagePagination(1)
        }
    }
    let [nowPagePagination, setNowPagePagination] = useState<number>(1)
    let endIndex = nowPagePagination + 40
    let startIndex = endIndex - 40
    let slicedBooksForRender: Array<object> = props.books.slice(startIndex, endIndex)
    let propsForPaginationRender: { nowPage: number, funcForChangePage(page: number): void, totalBooks: number } = {
        nowPage: nowPagePagination,
        funcForChangePage: function (page: number) {
            setNowPagePagination(page)
        },
        totalBooks: props.totalBooks
    }

    let arrowFunction = (boolean: boolean) => {
        if (boolean) {
            setNowPagePagination(prev => prev + 1)

        } else {
            setNowPagePagination(prev => prev - 1)

        }
    }

    return (
        <div className={classes.HomePage}>
            <div className={classes.findArea}>
                <h1>Search for books</h1>
                <div className={classes.inputArea}>
                    <input
                        type="text"
                        required
                        id='inputId'
                        value={state.inputValue}
                        onChange={evt => setState(prev => ({...prev, inputValue: evt.target.value}))}
                        onKeyDown={evt => enterInputHandler(evt)}
                    />

                    <label htmlFor="inputId">Впишите название книги или автора...</label>
                    <button
                        onClick={searchToggle}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className={classes.sortArea}>
                    <label htmlFor="categories">Categories</label>
                    <select
                        name="categories"
                        id="categories"
                        onChange={evt => setState(prev => ({...prev, categories: evt.target.value}))}>
                        {optionsValue.map((option: string, index) => {
                            return (
                                <option key={index + 1} value={option}>
                                    {option}
                                </option>
                            )
                        })}
                    </select>
                    <label htmlFor="sorting">Sorting by</label>
                    <select
                        name="sorting"
                        id="sorting"
                        onChange={evt => setState(prev => ({...prev, sort: evt.target.value}))}
                    >
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                    </select>

                </div>
            </div>
            {props.isLoading ? <CSSLoader/> : <RenderedBooks dataBooks={slicedBooksForRender}/>}

            {props.isLoadingAllBooks ?
                <h3 style={{textAlign: 'center'}}>Идет подгрузка книг...</h3> :
                <Pages paginationData={propsForPaginationRender}/>
            }
            {props.isLoadingAllBooks ?
                <h3 style={{textAlign: 'center'}}>...</h3> :
                <ArrowPagination
                    paginationData={propsForPaginationRender}
                    arrowFunction={arrowFunction}
                />
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        books: state.Books.books,
        totalBooks: state.Books.totalBooks,
        isLoading: state.Books.isLoading,
        isLoadingAllBooks: state.Books.isLoadingAllBooks
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        searchBooks: (data: IState) => dispatch(booksSearch(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)