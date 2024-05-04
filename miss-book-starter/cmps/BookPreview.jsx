export function BookPreview({book}){
   return ( 
        <article key={book.id}>
            <span className="close-btn" onClick={() => onRemoveBook(book.id)}>X</span>
            <br></br>
            <span>{book.title}</span>
            <span>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
        </article>
)}
