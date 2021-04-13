<template>
  <div class="row">
    <div class="d-flex justify-content-between mb-2">
      <div class="d-flex">
        <input id="search"
               type="text"
               class="form-control"
               v-model="searchText"
               placeholder="Search..."
               @input="search"
               style="border-right: none; border-radius: 5px 0 0 5px">
        <div class="dropdown">
          <button class="btn btn-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style="border: 1px solid #ced4da; border-radius: 0 5px 5px 0">
            {{ category ? category : 'All' }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a class="dropdown-item" href="#" @click="category = ''">All</a>
            </li>
            <li v-for="selectCategory in allCategories" @click="category = selectCategory.name">
              <a class="dropdown-item"
                 href="#">
                {{ selectCategory.name }}
              </a>
            </li>
          </ul>
        </div>
        <div class="d-flex ms-2">
          <button type="button" class="btn me-2 d-flex" @click="sort(1)">
            <i v-if="sortVal === 1" class="bi bi-arrow-down"></i>
            <i v-if="sortVal === 2" class="bi bi-arrow-up"></i>
            Title
          </button>
          <button type="button" class="btn me-2 d-flex" @click="sort(2)">
            <i v-if="sortVal === 3" class="bi bi-arrow-down"></i>
            <i v-if="sortVal === 4" class="bi bi-arrow-up"></i>
            Author
          </button>
        </div>
      </div>
      <BookModal :bookToEdit="bookToEdit"
                 :all-categories="allCategories"
                 @addBook="addBook"
                 @editedBook="editedBook"
                 @showModal="toggleModal"></BookModal>
    </div>
  </div>

  <div v-if="$route.query.category" class="text-center">{{ $route.query.category }}</div>
  <h4 v-if="filteredBooks.length === 0" class="text-center mt-5">No books</h4>

  <div class="row">
    <div v-for="(book, index) in filteredBooks" :key="book.isbn" class="col-md-3 py-2">
      <BookCard :book="book"
                @editBook="editBook(index)"
                @deleteBook="deleteBook"
                @setStarRating="setStarRating(index, $event)"
                @setRating="setRating(index, $event)"></BookCard>
    </div>
  </div>
</template>

<script>
import BookCard from './BookCard'
import { deleteBook, editRating, editStarRating, fetchBooks, getCategories } from "../services/library.service";
import BookModal from "./BookModal";

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
      sortVal: 0,
      searchText: '',
      bookToEdit: null,
      modal: null,
      category: '',
      allCategories: []
    }
  },
  async created() {
    this.books = await fetchBooks()
    this.allCategories = await getCategories()
    this.modal = new bootstrap.Modal(document.getElementById("exampleModal"), {})
    this.filterIfCategory()
  },
  watch: {
    category() {
      this.filterIfCategory()
    }
  },
  methods: {
    filterIfCategory() {
      if (!this.category) {
        this.filteredBooks = this.books
        return
      }
      this.filteredBooks = this.books.filter(book => book.categories.includes(this.category))
    },
    sort(sortBy) {
      switch (sortBy) {
        case 1:
          if (this.sortVal === 1) {
            this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title))
            this.sortVal = 2
          } else {
            this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title))
            this.sortVal = 1
          }
          break
        case 2:
          if (this.sortVal === 3) {
            this.filteredBooks.sort((a, b) => b.author.localeCompare(a.author))
            this.sortVal = 4
          } else {
            this.filteredBooks.sort((a, b) => a.author.localeCompare(b.author))
            this.sortVal = 3
          }
          break
      }
    },
    addBook(book) {
      this.books = [...this.books, book]
      this.search()
    },
    async deleteBook(isbn) {
      const book = this.books.find(book => book.isbn === isbn)
      if (!confirm(`Are sure you want to delete ${ book.title }?`)) {
        return
      }
      await deleteBook(isbn)
      this.books = this.books.filter(book => book.isbn !== isbn)
      this.search()
    },
    async editBook(index) {
      this.bookToEdit = this.books[index]
      this.modal.show()
    },
    editedBook(editedBook) {
      this.books[this.books.findIndex((book) => book.isbn === editedBook.isbn)] = editedBook
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
      open ? this.modal.show() : this.modal.hide();
    }
  }
}
</script>

<style scoped>
</style>
