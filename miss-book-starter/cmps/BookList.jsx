import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemove, onShowDetails }) {
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                <BookPreview book={book} />
                <button onClick={() => onRemove(book.id)}>x</button>
                <button onClick={() => onShowDetails(book)}>Details</button>
                <hr></hr>
            </li>
            )}
        </ul>
    )
}