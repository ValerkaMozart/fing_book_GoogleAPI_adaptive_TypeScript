import React from "react"
import classes from './Pages.module.scss'

interface propsComponent {
    paginationData : {nowPage: any, funcForChangePage(page: number): void, totalBooks: number}
}

let Pages : React.FC<propsComponent> = props => {

    

    let allPages: Array<number> = []
    for (let i = 1; i <= Math.ceil(props.paginationData.totalBooks / 40); i++) {
        allPages.push(i)
    }
    let pageActiveStyle = {
        color: 'red',
        transform: 'translateY(-20px)'
    }
    return (
        <div className={classes.Pages}>
            <ul>
                { allPages.map((page: number) => {

                    return (
                        <li key={page}
                            style={props.paginationData.nowPage === page ? pageActiveStyle : {}}
                            onClick={() => props.paginationData.funcForChangePage(page)}
                        >
                            {page}
                        </li>
                    )
                } ) }
            </ul>
        </div>
    )
}

export default Pages