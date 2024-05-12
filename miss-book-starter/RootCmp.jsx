const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter


import { BookIndex } from "./pages/BookIndex.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"


import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookDetails } from "./cmps/BookDetails.jsx"
import { BookEdit } from './cmps/BookEdit.jsx'
import { AddBook } from "./cmps/AddBook.jsx"




export function RootCmp() {
    return (
        <Router>
             <AppHeader />
             <main className="content-grid">
                <Routes>
                        <Route element={<AddBook />} path='/book/add/' />
                        <Route element={<BookEdit />} path='/book/edit/:bookId' />
                        <Route element={<BookDetails />} path='/book/:bookId' />
                        <Route element={<BookIndex />} path='/book' />
                        <Route element={<About />} path='/about' />
                        <Route element={<Home />} path='/' />
                </Routes>
             </main>
       
    </Router>
    )
}
