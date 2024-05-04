import { BookIndex } from "./pages/BookIndex.jsx"
const { useState } = React

export function RootCmp() {
    const [ route, setRoute ] = useState('books')

    return (
<section className="app">
        <header className="flex">
            <h1>My App</h1>
            <nav>
                <ul className="flex">
                    <li><a onClick={()=> setRoute('books')}>Books</a></li>
                    <li><a onClick={()=> setRoute('about-us')}>About Us</a></li>
                    <li><a onClick={()=> setRoute('home-page')}>Home Page</a></li>
                </ul>
            </nav>

        </header>

        <main className="content-grid">
            {route==='books' &&  <BookIndex/>}
            {/* {route='about-us' &&  <AboutUs/>}
            {route='books' &&  <HomePage/>} */}
        </main>
        </section>
    )
}