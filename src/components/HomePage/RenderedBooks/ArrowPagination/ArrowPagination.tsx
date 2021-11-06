import React, {useState} from "react"
import classes from './ArrowPagination.module.scss'

interface propsComponent {
    paginationData: { nowPage: any, funcForChangePage(page: number): void, totalBooks: number },

    arrowFunction(boolean: boolean): void
}

let ArrowPagination: React.FC<propsComponent> = props => {
    let allPages: Array<number> = []
    let [validPaginationState, setValidPaginationState] = useState({
        forwardWake: false,
        backWake: false
    })
    if (!props.paginationData.totalBooks) {
        return null
    }

    for (let i = 1; i <= Math.ceil(props.paginationData.totalBooks / 40); i++) {
        allPages.push(i)
    }
    let validStyle: object = {
        opacity: '1',
        color: 'green'
    }
    let invalidStyle: object = {
        opacity: '.5',
        color: 'red'
    }


    let paginationFunction = (isBoolean: boolean) => {
        if (isBoolean) {
            if (props.paginationData.nowPage < allPages.length-1) {
                setValidPaginationState(prev => ({...prev, forwardWake: true}))
            } else {
                setValidPaginationState(prev => ({...prev, forwardWake: false}))
            }
            if (validPaginationState.forwardWake) {
                props.arrowFunction(true)
            }
        } else {
            if (props.paginationData.nowPage > 2) {
                setValidPaginationState(prev => ({...prev, backWake: true}))
            } else {
                setValidPaginationState(prev => ({...prev, backWake: false}))
            }
            if (validPaginationState.backWake) {
                props.arrowFunction(false)
            }
        }

    }
    return (
        <div className={classes.ArrowPagination}>
            <button
                style={validPaginationState.backWake || props.paginationData.nowPage >= 2 ? validStyle : invalidStyle}
                onClick={() => paginationFunction(false)}
            >
                <i className="far fa-arrow-alt-circle-left"></i>
            </button>
            <span>Страница {props.paginationData.nowPage} из {allPages.length}</span>
            <button
                style={validPaginationState.forwardWake || props.paginationData.nowPage <= allPages.length - 1 ? validStyle : invalidStyle}
                onClick={() => paginationFunction(true)}
            >
                <i className="far fa-arrow-alt-circle-right"></i>
            </button>
        </div>
    )
}

export default ArrowPagination