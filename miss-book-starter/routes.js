import { About } from "./pages/About";
import { BookDetails } from "./cmps/BookDetails.jsx";
import { BookEdit } from "./cmps/BookEdit.jsx";
import { BookIndex } from "./pages/BookIndex.jsx";
import { Home } from "./pages/Home.jsx";



export const routes = [
    {
        path: 'about',
        element: <About />
    },
    {
        path: '',
        element: <Home />
    },
    {
        path: 'book/:bookId',
        element: <BookDetails />
    },
    {
        path: 'book',
        element: <BookIndex />
    },
    {
        path: 'book/edit',
        element: <BookEdit />
    },
    {
        path: 'book/edit/:bookId',
        element: <BookEdit />
    },
    {
        path: 'book/add',
        element: <AddBook />
    },
]