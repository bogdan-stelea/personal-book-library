export async function fetchBooks() {
    const res = await fetch('http://localhost:3000/library/books')
    return res.json()
}

export async function fetchBook(isbn) {
    const res = await fetch(`http://localhost:3000/library/books/${isbn}`)
    return res.json()
}

export async function addBook(book) {
    const res = await fetch('http://localhost:3000/library/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
    return res.text()
}

export async function editBook(book) {
    const res = await fetch('http://localhost:3000/library/books', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(book)
    })
    return res.text()
}

export async function editRating(isbn, rating) {
    const res = await fetch('http://localhost:3000/library/books/rating', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isbn: isbn,
            rating: rating
        })
    })
    return res.text()
}

export async function editStarRating(isbn, starRating) {
    const res = await fetch('http://localhost:3000/library/books/star-rating', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isbn: isbn,
            starRating: starRating
        })
    })
    return res.text()
}

export async function deleteBook(isbn) {
    const res = await fetch(`http://localhost:3000/library/books/${ isbn }`, {
        method: 'DELETE'
    })
    if (!(res.status === 200)) alert('Error deleting Book')
    return res.text()
}

export async function getCategories() {
    const res = await fetch('http://localhost:3000/library/categories')
    return res.json()
}
