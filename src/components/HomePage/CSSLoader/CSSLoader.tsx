import React from "react"
import classes from './CSSLoader.module.scss'

let CSSLoader : React.FC = () => {
    return (
        <div className={classes.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default CSSLoader