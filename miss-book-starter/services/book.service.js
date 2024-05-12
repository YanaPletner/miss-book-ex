import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'



export const bookService = {
    query,
    remove,
    getBookById,
    saveReview,
    removeReview,
    getFilterBy,
    addBook,
    saveBook,
}

const STORAGE_KEY = 'bookDB'

function query(filterBy = null) {
    let books = _createBooks()
    if (filterBy) books = _getFilteredBooks(books, filterBy)
    return Promise.resolve(books)
}


function getBookById(bookId) {
    const books = _loadBooksFromStorage()
    const book = books.find((book) => book.id === bookId)
    return Promise.resolve(book)
}

function remove(bookId) {
    let books = _loadBooksFromStorage()
    books = books.filter((book) => book.id !== bookId)
    _saveBooksToStorage(books)
    return Promise.resolve()
}

function saveBook(book) {
    let savedBook
    if (book.id) savedBook = updateBook(book)
    else savedBook = addBook(book)
    return Promise.resolve(savedBook)
}

function updateBook(book) {
    let books = _loadBooksFromStorage()
    books = books.map(b => b.id === book.id ? book : b)
    _saveBooksToStorage(books)
    return book
}

function addBook(book) {
    let books = _loadBooksFromStorage()
    books = [...books, book]
    _saveBooksToStorage(books)
    return book
}

function removeReview(bookId, reviewId) {
    let books = _loadBooksFromStorage()
    let book = books.find((book) => book.id === bookId)
    const newReviews = book.reviews.filter((review) => review.id !== reviewId)
    book.reviews = newReviews
    _saveBooksToStorage(books)
    return Promise.resolve()
}

function getFilterBy() {
    return {
        title: '',
        minPrice: '',
        maxPrice: '',
    }
}

function saveReview(bookId, reviewToSave) {
    const books = _loadBooksFromStorage()
    const book = books.find((book) => book.id === bookId)
    const review = _createReview(reviewToSave)
    book.reviews.unshift(review)
    _saveBooksToStorage(books)
    return Promise.resolve(review)
}

function _getFilteredBooks(books, filterBy) {
    let { title, minPrice, maxPrice } = filterBy
    if (!minPrice) minPrice = 0
    if (!maxPrice) maxPrice = Infinity
    return books.filter((book) => {
        return (
            book.title.includes(title)
            &&
            book.listPrice.amount >= minPrice &&
            book.listPrice.amount <= maxPrice
        )
    })
}


function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function _saveBooksToStorage(books) {
    storageService.saveToStorage(STORAGE_KEY, books)
}

function _loadBooksFromStorage() {
    return storageService.loadFromStorage(STORAGE_KEY)
}

function _createBooks() {
    let books = _loadBooksFromStorage()
    if (!books || !books.length) {
        books = [
            {
                id: 'OXeMG8wNskc',
                title: 'metus hendrerit',
                subtitle: 'mi est eros convallis auctor arcu dapibus himenaeos',
                authors: ['Barbara Cartland'],
                publishedDate: 1999,
                description:
                    'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse',
                pageCount: 713,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
                language: 'en',
                listPrice: {
                    amount: 109,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'JYOJa2NpSCq',
                title: 'morbi',
                subtitle: 'lorem euismod dictumst inceptos mi',
                authors: ['Barbara Cartland'],
                publishedDate: 1978,
                description:
                    'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
                pageCount: 129,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
                language: 'sp',
                listPrice: {
                    amount: 44,
                    currencyCode: 'EUR',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: '1y0Oqts35DQ',
                title: 'at viverra venenatis',
                subtitle: 'gravida libero facilisis rhoncus urna etiam',
                authors: ['Dr. Seuss'],
                publishedDate: 1999,
                description:
                    'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant',
                pageCount: 972,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
                language: 'he',
                listPrice: {
                    amount: 108,
                    currencyCode: 'ILS',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'kSnfIJyikTP',
                title: 'dictum',
                subtitle:
                    'augue eu consectetur class curabitur conubia ligula in ullamcorper',
                authors: ['Danielle Steel'],
                publishedDate: 1978,
                description:
                    'interdum inceptos mauris habitant primis neque tempus lacus morbi auctor cras consectetur euismod vehicula neque netus enim vivamus augue molestie imperdiet tincidunt aliquam',
                pageCount: 303,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/16.jpg',
                language: 'en',
                listPrice: {
                    amount: 30,
                    currencyCode: 'EUR',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'f4iuVmbuKCC',
                title: 'sem himenaeos aptent',
                subtitle: 'interdum per habitasse luctus purus est',
                authors: ['Dr. Seuss'],
                publishedDate: 2011,
                description:
                    'et vehicula faucibus amet accumsan lectus cras nulla cubilia arcu neque litora mi habitasse quis amet augue facilisis sed',
                pageCount: 337,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/12.jpg',
                language: 'sp',
                listPrice: {
                    amount: 19,
                    currencyCode: 'USD',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'U2rfZO6oBZf',
                title: 'mi ante posuere',
                subtitle:
                    'sapien curae consectetur ultrices fringilla blandit ipsum curae faucibus',
                authors: ['Leo Tolstoy'],
                publishedDate: 1978,
                description:
                    'senectus habitant nam imperdiet nostra elit dapibus nisl adipiscing in',
                pageCount: 748,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/1.jpg',
                language: 'en',
                listPrice: {
                    amount: 91,
                    currencyCode: 'USD',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'xI0wrXaaAcq',
                title: 'non',
                subtitle:
                    'leo tortor per dapibus mattis ut conubia porttitor ligula viverra',
                authors: ['Leo Tolstoy'],
                publishedDate: 2011,
                description:
                    'nec scelerisque id cursus platea sit ullamcorper bibendum ultrices tempus ante mi aliquet cras tortor dapibus dictum scelerisque',
                pageCount: 65,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/14.jpg',
                language: 'he',
                listPrice: {
                    amount: 90,
                    currencyCode: 'USD',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: '9laHCEdSpFy',
                title: 'tristique',
                subtitle: 'consectetur a eu tincidunt condimentum amet nisi',
                authors: ['Dr. Seuss'],
                publishedDate: 1999,
                description:
                    'magna quisque venenatis laoreet purus in semper habitant proin pellentesque sed egestas cursus faucibus nam enim id sit mi ligula risus curabitur senectus curabitur sodales fames sem',
                pageCount: 299,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/11.jpg',
                language: 'he',
                listPrice: {
                    amount: 176,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'nGhVwZvGCGp',
                title: 'urna ornare gravida',
                subtitle: 'sem vestibulum semper convallis pharetra tempor himenaeos ut',
                authors: ['Jin Yong'],
                publishedDate: 2011,
                description:
                    'porttitor nisl sodales id eu tellus venenatis laoreet auctor dictumst nulla',
                pageCount: 803,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/10.jpg',
                language: 'sp',
                listPrice: {
                    amount: 116,
                    currencyCode: 'USD',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'Q8Q9Lsd03BD',
                title: 'consequat neque volutpat',
                subtitle: 'vel quis taciti fermentum feugiat ullamcorper curae praesent',
                authors: ['Dr. Seuss'],
                publishedDate: 1978,
                description:
                    'curabitur bibendum in dolor neque magna phasellus arcu nulla cubilia senectus maecenas ullamcorper neque accumsan facilisis dictumst ornare',
                pageCount: 891,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/5.jpg',
                language: 'en',
                listPrice: {
                    amount: 145,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'bd7a76kARao',
                title: 'risus',
                subtitle: 'pretium bibendum pharetra curabitur quisque dictumst',
                authors: ['Danielle Steel'],
                publishedDate: 2018,
                description:
                    'auctor amet nostra luctus molestie proin platea cubilia netus sed purus egestas a primis eu tristique interdum litora lorem venenatis mattis senectus',
                pageCount: 86,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/16.jpg',
                language: 'sp',
                listPrice: {
                    amount: 157,
                    currencyCode: 'ILS',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'qKyG0vqeO3e',
                title: 'interdum etiam vulputate',
                subtitle: 'velit sapien eget tincidunt nunc tortor',
                authors: ['Danielle Steel'],
                publishedDate: 2018,
                description:
                    'aenean mauris porta netus accumsan turpis etiam vestibulum vivamus sagittis nullam nec tellus quam mattis est pellentesque nisi litora sit ad',
                pageCount: 882,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/17.jpg',
                language: 'sp',
                listPrice: {
                    amount: 57,
                    currencyCode: 'USD',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: '2RvT48ZNInj',
                title: 'sagittis justo',
                subtitle: 'etiam primis proin praesent placerat nisi fermentum nisi',
                authors: ['Agatha Christie'],
                publishedDate: 2011,
                description:
                    'nec faucibus arcu suspendisse tempus potenti lobortis aliquam quisque augue integer consectetur etiam ultrices curabitur tristique metus',
                pageCount: 598,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/8.jpg',
                language: 'en',
                listPrice: {
                    amount: 167,
                    currencyCode: 'ILS',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: '5z2s9pDXAYj',
                title: 'quam ullamcorper himenaeos',
                subtitle: 'ut placerat eu dapibus sapien sodales laoreet',
                authors: ['Danielle Steel'],
                publishedDate: 1999,
                description:
                    'etiam nec aliquam euismod platea vel laoreet quisque condimentum sapien neque ut aliquam torquent in nam',
                pageCount: 608,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/3.jpg',
                language: 'he',
                listPrice: {
                    amount: 150,
                    currencyCode: 'USD',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'zBZu5cDEWha',
                title: 'quis',
                subtitle: 'suscipit turpis etiam turpis libero lobortis',
                authors: ['Jin Yong'],
                publishedDate: 2011,
                description:
                    'etiam pretium urna fusce lobortis curae viverra aptent metus semper nisi litora feugiat elementum purus nunc consequat lorem ultricies non primis phasellus sociosqu donec dolor',
                pageCount: 583,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/6.jpg',
                language: 'en',
                listPrice: {
                    amount: 58,
                    currencyCode: 'ILS',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'aOI7tQuPZ2f',
                title: 'aliquam aliquet dapibus',
                subtitle:
                    'neque eu purus euismod placerat adipiscing odio egestas consequat',
                authors: ['Leo Tolstoy'],
                publishedDate: 2011,
                description:
                    'dolor morbi malesuada eleifend purus taciti sit interdum aliquet commodo ut libero tincidunt',
                pageCount: 497,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/7.jpg',
                language: 'en',
                listPrice: {
                    amount: 78,
                    currencyCode: 'USD',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'WBooB82Uvwu',
                title: 'class',
                subtitle:
                    'elit enim ultricies amet imperdiet a molestie class elementum venenatis',
                authors: ['Danielle Steel'],
                publishedDate: 1999,
                description:
                    'rhoncus odio netus consectetur aenean hendrerit massa scelerisque elementum aptent lobortis pharetra maecenas quam nulla volutpat turpis non habitasse aenean ante sodales lobortis quisque libero imperdiet gravida eleifend nulla',
                pageCount: 804,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/10.jpg',
                language: 'en',
                listPrice: {
                    amount: 118,
                    currencyCode: 'ILS',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'xm1z5bbZjlS',
                title: 'vitae',
                subtitle: 'class habitant at commodo semper ligula a bibendum',
                authors: ['Leo Tolstoy'],
                publishedDate: 1999,
                description:
                    'himenaeos quis iaculis orci libero egestas quam varius primis erat lacus facilisis blandit dictum tristique interdum litora quisque purus senectus pretium purus',
                pageCount: 231,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/12.jpg',
                language: 'he',
                listPrice: {
                    amount: 60,
                    currencyCode: 'EUR',
                    isOnSale: false,
                },
                reviews: [],
            },
            {
                id: 'u3j6QIKLlJb',
                title: 'rhoncus vivamus',
                subtitle: 'nullam class risus amet senectus scelerisque etiam curabitur',
                authors: ['Agatha Christie'],
                publishedDate: 1978,
                description:
                    'torquent in et id lacus vivamus aptent cursus erat integer venenatis risus ac ante quam etiam euismod feugiat risus suscipit rhoncus pharetra quisque felis',
                pageCount: 652,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/20.jpg',
                language: 'he',
                listPrice: {
                    amount: 110,
                    currencyCode: 'USD',
                    isOnSale: true,
                },
                reviews: [],
            },
            {
                id: 'vxYYYdVlEH3',
                title: 'donec mi ullamcorper',
                subtitle:
                    'varius malesuada augue molestie sollicitudin faucibus mi eu tempus',
                authors: ['William Shakespeare'],
                publishedDate: 2011,
                description:
                    'aliquet euismod mi vivamus bibendum donec etiam quisque iaculis ullamcorper est sed',
                pageCount: 904,
                categories: ['Computers', 'Hack'],
                thumbnail: 'http://coding-academy.org/books-photos/2.jpg',
                language: 'sp',
                listPrice: {
                    amount: 186,
                    currencyCode: 'ILS',
                    isOnSale: true,
                },
                reviews: [],
            },
        ]
    }
    _saveBooksToStorage(books)
    return books
}













// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

// const BOOK_KEY = 'bookDB'
// _createBooks()

// export const bookService = {
//     query,
//     get,
//     remove,
//     save,
//     getAllBooks,
//     getDefaultFilter,
//     addReview,
//     getBooksFromApi,
// }

// function query(filterBy = {}) {
//     return storageService.query(BOOK_KEY)
//         .then(books => {
//             if (filterBy.title) {
//                 const regExp = new RegExp(filterBy.title, 'i')
//                 books = books.filter(book => regExp.test(book.title))
//             }

//             if (filterBy.amount) {
//                 books = books.filter(book => book.listPrice.amount === filterBy.amount)
//             }
//             return books
//         })
// }


// function get(bookId) {
//     const books = utilService.loadFromStorage(BOOK_KEY)
//     const book = books.find((book) => book.id === bookId)
//     console.log(book)
//     return bookId
//     // const books = utilService.loadFromStorage(BOOK_KEY)
//     // console.log(books)
//     // const book = books.find((book) => parseInt(book.id) === parseInt(bookId))
//     // return book

//     // if (!book) {
//     //     // If book with specified ID is not found, reject the promise
//     //     return Promise.reject(new Error(`Book with ID ${bookId} not found`));
//     // }
//     // return Promise.resolve(book)
// }

// function remove(bookId) {
//     return storageService.remove(BOOK_KEY, bookId)
// }

// function save(book) {
//     if (book.id) {
//         return storageService.put(BOOK_KEY, book)
//     } else {
//         return storageService.post(BOOK_KEY, book)
//     }
// }

// function getAllBooks() {
//     return utilService.loadFromStorage(BOOK_KEY)
// }

// function getDefaultFilter(filterBy = { title: '', amount: 0 }) {
//     return { title: filterBy.title, amount: filterBy.amount }
// }

// function _createBooks() {
//     const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//     const books = []
//     for (let i = 0; i < 20; i++) {
//         const book = {
//             id: utilService.makeId(),
//             title: utilService.makeLorem(2),
//             subtitle: utilService.makeLorem(4),
//             authors: [
//                 utilService.makeLorem(1)
//             ],
//             publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//             description: utilService.makeLorem(20),
//             pageCount: utilService.getRandomIntInclusive(20, 600),
//             categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//             thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
//             language: "en",
//             listPrice: {
//                 amount: utilService.getRandomIntInclusive(80, 500),
//                 currencyCode: "EUR",
//                 isOnSale: Math.random() > 0.7
//             }
//         }
//         books.push(book)
//     }
//     utilService.saveToStorage(BOOK_KEY, books)
// }

// function addReview(bookId, review) {
//     const response = fetch(`/api/books/${bookId}/reviews`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(review)
//     })

//     if (!response.ok) {
//         throw new Error('Failed to add review');
//     }

//     return response.json()
// }

// function getBooksFromApi() {
//     return axios.get('https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20javascript')
//         .then(prm => console.log(prm.data))
// }
// // getBooksFromApi()