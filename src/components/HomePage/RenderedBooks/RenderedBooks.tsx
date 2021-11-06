import React from "react"
import classes from './RenderedBooks.module.scss'

interface propsComponent {
    dataBooks: Array<object>,

}

let RenderedBooks: React.FC<propsComponent> = (props) => {

    if (!props.dataBooks.length) {
        return (
            <div className={classes.RenderedBooks}>
                <h1>Произведите поиск...</h1>
            </div>

        )
    }
    return (
        <div className={classes.RenderedBooks}>
            <ul>
                {props.dataBooks.map((book: any, index: number) => {
                    let thumbnail = book.volumeInfo.imageLinks || '/'
                    let imgBook: any = Object.values(thumbnail)[1]
                    let categories: Array<string> = book.volumeInfo.categories || ['Без категории']
                    let description: Array<string> = book.volumeInfo.description || ['Без описания']
                    let author: Array<string> = book.volumeInfo.authors || ['Автор не указан']
                    return (
                       <a href={book.volumeInfo.infoLink} key={index + 1}  rel="noreferrer" target='_blank'>
                           <li>
                               <h3>{book.volumeInfo.title}</h3>
                               <img src={imgBook} alt="Book IMG"/>
                               <div>
                                   <p>Author : {author}</p>
                                   <p>Categories : {categories.join('')}</p>
                                   <p>Description: {description}</p>
                               </div>

                           </li>
                       </a>

                    )
                })}
            </ul>
        </div>
    )
}

export default RenderedBooks