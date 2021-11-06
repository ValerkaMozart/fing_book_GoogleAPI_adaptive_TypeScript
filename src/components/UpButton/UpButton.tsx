import React, {useState} from "react"
import classes from './UpButton.module.scss'
let UpButton : React.FC =  () => {
    let [scrollPx, setScrollPx] = useState<number>(0)
    let [isRender, setIsRender] = useState(false)
    document.addEventListener('scroll', (evt) => {
        setScrollPx(window.pageYOffset)
        if (scrollPx > 1600) {
            setIsRender(true)
        } else {
            setIsRender(false)
        }
    })
    if (!isRender) {
        return null
    }
    let scrollHandler = () => {
        window.scroll({top: 10, behavior: "smooth"});
    }

    return (
            <div className={classes.UpButton}>
                <button onClick={scrollHandler}>
                    <i className="fas fa-level-up-alt">

                    </i></button>
            </div>

    )
}

export default UpButton