const { useState, useEffect } = React

import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import {BookList} from "../cmps/BookList.jsx"

export function BookIndex(){
    const [ books, setBooks ] = useState(bookService.getAllBooks)
    const [ filterBy, setFilterBy ] = useState(bookService.getDefaultFilter())
   
    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
                // showSuccessMsg(`Book removed`)
            })
            .catch(err => {
                console.log('err:', err)
                // showErrorMsg('Cannot remove book ' + bookId)
            })
    }

    
    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }
   
    console.log(books)

    return (
        <section>
            <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
            <h2>Books List</h2>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}