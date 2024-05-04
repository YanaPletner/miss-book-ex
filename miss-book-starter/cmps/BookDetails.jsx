export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <h3>{book.title}</h3>        
        <p>{book.listPrice.amount}</p>        
        <img src={`./BooksImages/${book.id}.jpg`} alt="" />
        <button onClick={onClose}>x</button>
    </section>
}