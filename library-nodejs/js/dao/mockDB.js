class MockDB {

    booksMap = {
        "1234": {
            isbn: "1234",
            title: "Maitrey",
            author: "Mircea Eliade",
            shortDescription: "descriere 1",
            rating: 1,
            starRating: 4,
            categorie: []
        },
        "2345": {
            isbn: "2345",
            title: "Ion",
            author: "Liviu Rebreanu",
            shortDescription: "descriere 2",
            rating: -1,
            starRating: 2
        },
        "3456": {
            isbn: "3456",
            title: "Alm",
            author: "qwe qwe",
            shortDescription: "descriere 2",
            rating: 0,
            starRating: 3
        }
    };

    getBook(isbn) {
        return this.booksMap[isbn];
    }

    addBook(book) {
        if (this.booksMap[book.isbn]) {
            return false
        }
        this.booksMap[book.isbn] = book;
        return true;
    }

    removeBook(isbn) {
        const c = Object.values(isbn)
        if (!this.booksMap[c]) {
            return false;
        }
        delete this.booksMap[c]
        return true;
    }

    editBook(book) {
        if (!this.booksMap[book.isbn]) {
            return false;
        }
        this.booksMap[book.isbn].author = book.author;
        this.booksMap[book.isbn].shortDescription = book.shortDescription;
        this.booksMap[book.isbn].rating = book.rating;
        this.booksMap[book.isbn].starRating = book.starRating;
        return true;
    }

    editRating(isbn, rating) {
        if (!this.booksMap[isbn]) {
            return false;
        }
        this.booksMap[isbn].rating = rating;
        return true;
    }

    editStarRating(isbn, starRating) {
        if (!this.booksMap[isbn]) {
            return false;
        }
        this.booksMap[isbn].starRating = starRating;
        return true;
    }

}

module.exports = MockDB
