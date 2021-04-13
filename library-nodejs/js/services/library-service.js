const LibraryDB = require('../dao/libraryDB')
class LibraryService {

    constructor() {
        this.libraryDb = new LibraryDB()
    }

    // Books

    async getBooks() {
        return await this.libraryDb.getBooks()
    }

    async getBook(isbn) {
        return await this.libraryDb.getBook(isbn)
    }

    async addBook(book) {
        if (!book) {
            return "Invalid book";
        }
        let bookValidation = this.validateBook(book);
        if (bookValidation !== 'ok') {
            return bookValidation
        }
        if (!await this.libraryDb.addBook(book)) {
            return "Book is already registered";
        }
        return "Book added successfully";
    }

    async editBook(book) {
        if (!book) {
            return "Invalid book";
        }
        let bookValidation = this.validateBook(book);
        if (bookValidation !== 'ok') {
            return bookValidation
        }
        if (!await this.libraryDb.editBook(book)) {
            return "Book is not registered";
        }
        return "Book edited successfully";
    }

    async editRating(isbn, rating) {
        if (!isbn) {
            return "Invalid code";
        }
        if (rating < -1 && rating > 1) {
            return "Invalid rating";
        }
        if (!await this.libraryDb.editRating(isbn, rating)) {
            return "Book is not registered";
        }
        return "Rating edited successfully";
    }

    async editStarRating(isbn, starRating) {
        if (!isbn) {
            return "Invalid code";
        }
        if (starRating < 0 && starRating > 4) {
            return "Invalid rating";
        }
        if (!await this.libraryDb.editStarRating(isbn, starRating)) {
            return "Book is not registered";
        }
        return "Star rating edited successfully";
    }

    async removeBook(isbn) {
        if (!isbn) {
            return "Invalid isbn";
        }
        if (!await this.libraryDb.removeBook(isbn)) {
            return "Book is not registered";
        }
        return "Book removed successfully";
    }

    validateBook(book) {
        if (!book.isbn) {
            return "Invalid book code";
        }
        if (!book.title) {
            return "Invalid book title";
        }
        if (!book.author) {
            return "Invalid book author";
        }
        if (!book.shortDescription) {
            return "Invalid description";
        }
        if (book.rating < -1 && book.rating > 1) {
            book.rating = 0;
        }
        if (book.starRating < 0 && book.starRating > 4) {
            book.starRating = -1;
        }
        return 'ok';
    }

    // Categories
    async getCategories() {
        return await this.libraryDb.getCategories();
    }

    async addCategory(category) {
        return await this.libraryDb.addCategory(category)
    }

    async removeCategory(category) {
        return await this.libraryDb.removeCategory(category)
    }
}

module.exports = LibraryService
