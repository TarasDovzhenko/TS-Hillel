type Book = {
    id: number;
    title: string;
    genre: string;
    authorId: number;
}

type Author = {
    id: number;
    name: string;
    books?: number[];
}

interface IBookService {
    getBooks(): Book[];
    getBookById(id: number): Book | undefined;
    getAuthors(): Author[];
    getAuthorById(id: number): Author | undefined;
    getBooksByAuthor(authorIdOrName: number | string): Book[];
    getAuthorByBookId(bookId: number): Author | undefined;
    search(query: string): Book[];
}

class BookService implements IBookService {
    books: Book[] = [
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

    authors: Author[] = [
        {
            id: 1,
            name: "Taras",
        },
        {
            id: 2,
            name: "Stas",
        },
    ];

    getBooks(): Book[] {
        return this.books;
    }

    getAuthors(): Author[] {
        return this.authors;
    }

    getBookById(id: number): Book | undefined {
        return this.books.find(book => book.id === id);
    }

    getAuthorById(id: number): Author | undefined {
        return this.authors.find(author => author.id === id);
    }

    getBooksByAuthor(authorName: string): Book[] {
        const author: Author | undefined = this.authors.find(a => a.name === authorName);
        return author ? this.books.filter(book => book.authorId === author.id) : [];
    }

    getAuthorByBookId(bookId: number): Author | undefined {
        const book: Book | undefined = this.getBookById(bookId);
        return book ? this.getAuthorById(book.authorId) : undefined;
    }

    search(query: string): Book[] {
        return this.books.filter(book =>
            book.title.includes(query) ||
            book.genre.includes(query) ||
            this.getAuthorById(book.authorId)?.name.includes(query)
        );
    }
}

const service:BookService = new BookService();
console.log(service.getBooks());
console.log(service.getAuthors());
console.log(service.search("Comedy"))
console.log(service.search("Lord of the ring"))

