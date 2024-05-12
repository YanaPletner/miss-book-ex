const { useState, useEffect } = React
// const { useParams, useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

import { BookFilter } from "../cmps/BookFilter.jsx"
import {BookList} from "../cmps/BookList.jsx"
// import { AddBook } from "../cmps/AddBook.jsx"

// import { BookDetails } from "../cmps/BookDetails.jsx"

export function BookIndex(){
    const [ books, setBooks ] = useState([])
    const [ filterBy, setFilterBy ] = useState(bookService.getFilterBy())
    // const [ selectedBook, setSelectedBook ] = useState(null)
    // const {bookId} = useParams()
    // const navigate = useNavigate()

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(books => setBooks(books));
    };

    function setFilter(filterBy) {
        setFilterBy(filterBy)
    };

    // useEffect(() => {
    //     bookService.query(filterBy)
    //         .then(books => setBooks(books))
    // }, [filterBy])

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('err:', err)
            })
    }

   

    // function showBookDetails() {
    //     setSelectedBook(selectedBook)
    //     // console.log(book)
    //     // navigate(`/book/${book.id}`)
    // }

    if (!books) return <div>Loading...</div>
  
    return (
        <section>
            <BookFilter filterBy={filterBy} onSetFilter={setFilter}/>
            <Link to='/book/add'><button>Add Book</button></Link>
            <h2>Books List</h2>
            {books.length && <BookList books={books} onRemoveBook={removeBook}/>}
            {/* {!selectedBook && <BookList books={books} onRemoveBook={removeBook} onShowDetails={showBookDetails} />} */}
            {/* {!books.length && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />} */}
        </section>
    )
}