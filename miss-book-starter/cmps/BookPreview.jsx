export function BookPreview({book}){
   return ( 
        <article key={book.id}>
            <span>{book.title}</span>
            <br></br>
            <span>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
        </article>
)}
