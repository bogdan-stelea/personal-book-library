const MongoClient = require('mongodb').MongoClient

class LibraryDB {

    constructor() {
        MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
            .catch(err => console.error(err))
            .then((client) => {
                this.db = client.db('library')
                console.log('Connected to db')
            })
    }

    // Books

    async getBooks() {
        return await this.db.collection('books').find({}).toArray()
    }

    async getBook(isbn) {
        const result = (await this.db.collection('books').find({ isbn: isbn }).toArray())[0]
        return result ? result : {}
    }

    async addBook(book) {
        try {
            return await this.db.collection('books').insertOne({ ...book, _id: book.isbn })
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    async editBook(book) {
        try {
            return await this.db.collection('books').replaceOne({ isbn: book.isbn }, { ...book, _id: book.isbn })
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    async editRating(isbn, rating) {
        try {
            return await this.db.collection('books').updateOne({ isbn: isbn }, { $set: { rating: rating } })
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    async editStarRating(isbn, starRating) {
        try {
            return await this.db.collection('books').updateOne({ isbn: isbn }, { $set: { starRating: starRating } })
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    async removeBook(isbn) {
        try {
            return await this.db.collection('books').deleteOne({ isbn: isbn })
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    // Categories
    async getCategories() {
        return await this.db.collection('categories').find({}).toArray()
    }

    async addCategory(category) {
        try {
            return await this.db.collection('categories').insertOne(category)
        } catch (err) {
            console.error(err)
            return {}
        }
    }

    // async editCategory(category) {
    //     try {
    //         return await this.db.collection('categories').replaceOne({ isbn: book.isbn }, { ...book, _id: book.isbn })
    //     } catch (err) {
    //         console.error(err)
    //         return {}
    //     }
    // }

    async removeCategory(category) {
        try {
            return await this.db.collection('categories').deleteOne({ name: category.name })
        } catch (err) {
            console.error(err)
            return {}
        }
    }
}

module.exports = LibraryDB
