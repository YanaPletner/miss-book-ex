export function BookPreview({book}){
   return ( 
        <article key={book.id}>
            <h3>{book.title}</h3>
            <h4>{book.subtitle}</h4>
            <img src={book.thumbnail} alt=""></img>
            <br></br>
            <span>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</span>
        </article>
)}
