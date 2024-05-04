export function BookDetails({ book, onClose }) {

    function pageCountTxt(){
        if(book.pageCount>500) return 'Serious Reading'
        else if( book.pageCount > 200) return 'Descent Reading'
        else return 'Light Reading'
    }

    function publishedDateTxt(){
        const currYear= new Date().getFullYear()
        const yearsPast = currYear - book.publishedDate
        if(yearsPast>10) return 'Vintage'
        else if(yearsPast===1) return 'New'
    }

    function onSaleSign(){
        if(book.listPrice.isOnSale) return 'ON SALE'
    }

    return <section className="book-details">
        <hr></hr>
        <button onClick={onClose}>x</button>
        <h2 className="sale">{onSaleSign()}</h2>
        <h3>{book.title}</h3>  
        <h4>{book.subtitle}</h4> 
        <p>{book.categories}</p>
        <p>{book.authors}</p>  

        <p className={`price ${book.listPrice.amount > 150 ? 'red' : ''} ${book.listPrice.amount < 20 ? 'green' : ''}`}>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`} </p> 
        <p>{ `Language: ${book.language}`}</p>       
        <img src={`./BooksImages/${book.id}.jpg`} alt="" />

        <span>{`Published: ${book.publishedDate}, `}</span>
        <span>{publishedDateTxt()}</span>

        <p>{book.description}</p>

        <span>{`Pages: ${book.pageCount}, `}</span>
        <span>{pageCountTxt()}</span>
        <hr></hr>
    </section>
}