import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const booksDemo = [
    {
        id: utilService.makeId(),
        title: "Book 1",
        listPrice: {
            amount: 20,
            currencyCode: "USD",
            isOnSale: true
        }
    },
    {
        id: utilService.makeId(),
        title: "Book 2",
        listPrice: {
            amount: 15,
            currencyCode: "USD",
            isOnSale: false
        }
    },
    {
        id: utilService.makeId(),
        title: "Book 3",
        listPrice: {
            amount: 30,
            currencyCode: "USD",
            isOnSale: true
        }
    }
]

const BOOK_KEY = 'bookDB'
_creatBooks(booksDemo)

export const bookService = {
    query,
    get,
    remove,
    save,
    getAllBooks,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.amount) {
                books = books.filter(book => book.listPrice.amount === filterBy.amount)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function _creatBooks(books) {
    utilService.saveToStorage(BOOK_KEY, books)
}


function getAllBooks() {
    return utilService.loadFromStorage(BOOK_KEY)
}

function getDefaultFilter(filterBy = { title: '', amount: 0 }) {
    return { title: filterBy.title, amount: filterBy.amount }
}