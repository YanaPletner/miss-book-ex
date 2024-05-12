const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { Loader } from "../cmps/Loader.jsx"

// export function BookDetails({book ,onClose }) {
export function BookDetails() {
    const [book, setBook] = useState(null)

    const {bookId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [bookId])

    function loadBook() {
        bookService.getBookById(bookId).then((book) => setBook(book))
    }

    if (!book) return <Loader />

    const {
        thumbnail,
        title,
        subtitle,
        pageCount,
        publishedDate,
        description,
        authors,
        categories,
        language,
        // reviews,
    } = book


    const { currencyCode, amount, isOnSale } = book.listPrice

    function pageCountTxt(){
        if(book){
        if(pageCount>500) return 'Serious Reading'
        else if(pageCount> 200) return 'Descent Reading'
        else return 'Light Reading'
        }
    }

    function publishedDateTxt(){
        if(book){
        const currYear= new Date().getFullYear()
        const yearsPast = currYear - publishedDate
        if(yearsPast>10) return 'Vintage'
        else if(yearsPast===1) return 'New'
        }
    }

    function onSaleSign(){
        if(book){
        if(isOnSale) return 'ON SALE'
        else return 'OnSale'
        }
    }

    function goBack(){
        navigate('/book')
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return <section className="book-details">
        <hr></hr>
        <button onClick={goBack} className="close-btn">x</button>
        <h2 className="sale">{onSaleSign()}</h2>

        <h3>{capitalize(title)}</h3>  
        <h4>{capitalize(subtitle)}</h4> 

        <img src={thumbnail} alt="" />

        <p>{categories}</p>
        <p>{authors}</p>  

        <p className={`price ${amount > 150 ? 'red' : ''} ${amount < 20 ? 'green' : ''}`}>{`${amount} ${currencyCode}`} </p> 
        <p>{ `Language: ${language}`}</p>       

        <span>{`Published: ${publishedDate}, `}</span>
        <span>{publishedDateTxt()}</span>

        <p>{description}</p>

        <span>{`Pages: ${pageCount}, `}</span>
        <span>{pageCountTxt()}</span> 

        <hr></hr>
    </section>
}