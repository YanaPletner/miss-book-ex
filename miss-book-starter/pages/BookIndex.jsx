import { bookService } from "../services/book.service.js"
export function BookIndex(){
    console.log(bookService.getAllBooks())
}