const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex(){
    const [ books, setBooks ] = useState(bookService.getAllBooks)
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())
   
    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    
    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }
   
    console.log(books)

    return (
        <section>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <ul>
                {books.map(book=>
                    <li key={book.id}>
                        <article key={book.id}>
                            <span className="close-btn">X</span>
                            <br></br>
                            <span>{book.title}</span>
                            <span>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
                        </article>
                        <hr></hr>
                    </li>
                )}
            </ul>
        </section>
    )
}