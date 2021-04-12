const MockDB = require('../dao/mockDB')
class LibraryService {

    mockDB = new MockDB()

    getBooksMap() {
        return Object.values(this.mockDB.booksMap);
    }

    getBook(isbn) {
        return this.mockDB.getBook(isbn)
    }

    addBook(book) {
        if (!book) {
            return "Invalid book";
        }
        let bookValidation = this.validateBook(book);
        if (bookValidation !== 'ok') {
            return bookValidation
        }
        if (!this.mockDB.addBook(book)) {
            return "Book is already registered";
        }
        return "Book added successfully";
    }

    editBook(book) {
        if (book) {
            return "Invalid book";
        }
        let bookValidation = this.validateBook(book);
        if (bookValidation !== 'ok') {
            return bookValidation
        }
        if (!this.mockDB.editBook(book)) {
            return "Book is not registered";
        }
        return "Book edited successfully";
    }

    editRating(isbn, rating) {
        if (!isbn) {
            return "Invalid code";
        }
        if (rating < -1 && rating > 1) {
            return "Invalid rating";
        }
        if (!this.mockDB.editRating(isbn, rating)) {
            return "Book is not registered";
        }
        return "Rating edited successfully";
    }

    editStarRating(isbn, starRating) {
        if (!isbn) {
            return "Invalid code";
        }
        if (starRating < 0 && starRating > 4) {
            return "Invalid rating";
        }
        if (!this.mockDB.editStarRating(isbn, starRating)) {
            return "Book is not registered";
        }
        return "Star rating edited successfully";
    }

    removeBook(isbn) {
        if (!isbn) {
            return "Invalid isbn";
        }
        if (!this.mockDB.removeBook(isbn)) {
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
        if (book.rating !== 'like' && book.rating !== 'dislike' && book.rating !== 'neutral') {
            book.rating = 'neutral';
        }
        if (book.starRating < 1 && book.starRating > 5 ) {
            book.starRating = 0;
        }
        return 'ok';
    }
}

module.exports = LibraryService
