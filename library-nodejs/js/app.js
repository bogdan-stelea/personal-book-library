const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const LibraryService = require('./services/library-service')

let libraryService = new LibraryService()

app.get('/library/books', (req, res) => {
    res.send(libraryService.getBooksMap())
})

app.get('/library/books/:isbn', (req, res) => {
    res.send(libraryService.getBook(req.params.isbn))
})

app.post('/library/books', (req, res) => {
    res.send(libraryService.addBook(req.body))
})

app.put('/library/books', (req, res) => {
    res.send(libraryService.editBook(req.body))
})

app.put('/library/books/rating', (req, res) => {
    const {isbn, rating} = req.body
    res.send(libraryService.editRating(isbn, rating))
})

app.put('/library/books/star-rating', (req, res) => {
    const {isbn, starRating} = req.body
    res.send(libraryService.editStarRating(isbn, starRating))
})

app.delete('/library/books/:isbn', (req, res) => {
    res.send(libraryService.removeBook(req.params))
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

