const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { storageService } from '../services/async-storage.service.js'
import { utilService } from '../services/util.service.js'


export function AddBook(){
    const navigate = useNavigate()

    const [book, setBook] = useState({
        id: utilService.makeId(11),
        title:'title',
        subtitle: utilService.makeLorem(10),
        authors: ['Martin Toy'],
        publishedDate: 1999,
        description: utilService.makeLorem(10),
        pageCount: 100,
        categories: ['all'],
        thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
        language: 'en',
        listPrice: {
            amount:100,
            currencyCode: 'EUR',
            isOnSale: false,
        },
        reviews: [],
    })

   function handleChange(event){
        const {name,value} = event.target
        setBook(prevBook => ({
            ...prevBook,
            [name]: value,
        }))
   }

   function handleSubmit(event) {
    event.preventDefault()
    const updatedBooks = [...storageService.loadFromStorage('bookDB') || [], book]
    storageService.saveToStorage('bookDB', updatedBooks)
    navigate('/book')
    }

    function goBack(){
        navigate('/book')
    }

    return(
        <section>
        <form onSubmit={handleSubmit}>

        <label>Book Title:</label>
        <input onChange={handleChange} value={book.title} name="title" type="text" required/>
        <br></br>

        <label>Price:</label>
        <input onChange={handleChange} defaultValue={book.listPrice.amount} name="listPrice.amount" type="number" required/>
        <br></br>

       <button type="submit">save</button>
       <button type="button" onClick={goBack}>Cancel</button>
       </form>
       </section>
    )
}