<template>

  <div class="d-flex justify-content-between">
    <label for="search"></label>
    <input id="search" type="text" v-model="searchText" placeholder="Search..." @input="search">
    <button type="button" class="btn btn-outline-secondary" @click="sort(1)">
      <i v-if="!titleSortDir" class="bi bi-arrow-down"></i>
      <i v-if="titleSortDir" class="bi bi-arrow-up"></i>
      Title
    </button>
    <button type="button" class="btn btn-outline-secondary" @click="sort(2)">
      <i v-if="!authorSortDir" class="bi bi-arrow-down"></i>
      <i v-if="authorSortDir" class="bi bi-arrow-up"></i>
      Author
    </button>
    <BookModal :bookToEdit="bookToEdit" @addBook="addBook" @editBook="editBook"
               @showModal="toggleModal"></BookModal>
  </div>

  <div class="row">
    <div v-for="(book, index) in filteredBooks" :key="book.isbn" class="col-md-4 p-2">
      <div class="card w-100 h-100">
        <div class="card-body d-flex flex-column justify-content-end">
          <BookCard :book="book" @deleteBook="deleteBook" @editBook="editBook(index)" @setRating="setRating(index, $event)"
                    @setStarRating="setStarRating(index, $event)"></BookCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookCard from './BookCard'
import { deleteBook, editRating, editStarRating, fetchBook, fetchBooks } from "../services/library.service";
import BookModal from "./AddBook";

export default {
  name: "BookList",
  components: {
    BookModal,
    BookCard,
  },
  data() {
    return {
      books: [],
      filteredBooks: [],
      titleSortDir: false,
      authorSortDir: false,
      searchText: '',
      bookToEdit: null
    }
  },
  async created() {
    this.books = await fetchBooks()
    this.filteredBooks = this.books
  },
  methods: {
    sort(sortBy) {
      switch (sortBy) {
        case 1:
          if (!this.titleSortDir) {
            this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
          } else {
            this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title))
          }
          this.titleSortDir = !this.titleSortDir
          break
        case 2:
          if (!this.authorSortDir) {
            this.filteredBooks.sort((a, b) => a.author.localeCompare(b.author))
          } else {
            this.filteredBooks.sort((a, b) => b.author.localeCompare(a.author))
          }
          this.authorSortDir = !this.authorSortDir
          break
      }
    },
    addBook(book) {
      this.books = [...this.books, book]
      this.search()
    },
    async deleteBook(isbn) {
      await deleteBook(isbn)
      this.books = this.books.filter(book => book.isbn !== isbn)
      this.search()
    },
    async editBook(index) {
      this.bookToEdit = this.books[index]
      new bootstrap.Modal(document.getElementById("exampleModal"), {}).show()
    },
    async setRating(index, rating) {
      await editRating(this.books[index].isbn, rating)
      this.books[index].rating = rating
      this.search()
    },
    async setStarRating(index, starRating) {
      await editStarRating(this.books[index].isbn, starRating)
      this.books[index].starRating = starRating
      this.search()
    },
    search() {
      if (!this.searchText) {
        this.filteredBooks = this.books
      }
      this.filteredBooks = this.books.filter(book => {
        return book.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
            book.author.toLowerCase().includes(this.searchText.toLowerCase()) ||
            book.shortDescription.toLowerCase().includes(this.searchText.toLowerCase())
      })
    },
    toggleModal(open) {
      this.bookToEdit = null
      // TODO: trebuie sa retin asta intr-o variabila pentru ca se creeaza unele diferite si se suprapun (FUCK)
      new bootstrap.Modal(document.getElementById("exampleModal"), {}).toggle()
      // open ? new bootstrap.Modal(document.getElementById("exampleModal"), {}).show() : new bootstrap.Modal(document.getElementById("exampleModal"), {}).hide();
    }
  }
}
</script>

<style scoped>
</style>
