"use strict";
class BookService {
    constructor() {
        this.books = [
            {
                id: 1,
                title: "Lord of the ring",
                genre: "Fantasy",
                authorId: 1
            },
            {
                id: 2,
                title: "Apostol",
                genre: "Comedy",
                authorId: 2
            },
        ];
        this.authors = [
            {
                id: 1,
                name: "Taras",
            },
            {
                id: 2,
                name: "Stas",
            },
        ];
    }
    getBooks() {
        return this.books;
    }
    getAuthors() {
        return this.authors;
    }
    getBookById(id) {
        return this.books.find(book => book.id === id);
    }
    getAuthorById(id) {
        return this.authors.find(author => author.id === id);
    }
    getBooksByAuthor(authorName) {
        const author = this.authors.find(a => a.name === authorName);
        return author ? this.books.filter(book => book.authorId === author.id) : [];
    }
    getAuthorByBookId(bookId) {
        const book = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    }
    search(query) {
        return this.books.filter(book => {
            var _a;
            return book.title.includes(query) ||
                book.genre.includes(query) ||
                ((_a = this.getAuthorById(book.authorId)) === null || _a === void 0 ? void 0 : _a.name.includes(query));
        });
    }
}
const service = new BookService();
console.log(service.getBooks());
console.log(service.getAuthors());
console.log(service.search("Comedy"));
console.log(service.search("Lord of the ring"));
