<template>

  <button type="button" class="btn btn-primary" @click="showModal(true)">
    Add book
  </button>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ bookToEdit ? 'Edit book' : 'Add book' }}</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="showModal(false)"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inputIsbn" class="form-label">ISBN</label>
            <input v-model="isbn" type="text" class="form-control" id="inputIsbn" placeholder="Please enter book isbn" :disabled="bookToEdit">
          </div>
          <div class="mb-3">
            <label for="inputTitle" class="form-label">Title</label>
            <input v-model="title" type="text" class="form-control" id="inputTitle" placeholder="Please enter book title">
          </div>
          <div class="mb-3">
            <label for="inputAuthor" class="form-label">Author</label>
            <input v-model="author" type="text" class="form-control" id="inputAuthor" placeholder="Please enter book author">
          </div>
          <div class="mb-3">
            <label for="inputDescription" class="form-label">Description</label>
            <input v-model="shortDescription" type="text" class="form-control" id="inputDescription" placeholder="Please enter book description">
          </div>
          <div>
            <div>{{ options }}</div>
            <select v-for="(_, index) in categories" v-model="categories[index]" class="d-block">
              <option v-for="category in allCategories" :value="category.name">{{ category.name }}</option>
            </select>
            <button v-if="categories.length > 1" @click="dropCategory">-</button>
            <button @click="addCategory">+</button>
          </div>
          <div class="d-flex justify-content-between">
            <StarRating :star-rating="starRating" @setStarRating="starRating = $event" ></StarRating>
            <Rating :rating="rating" @setRating="rating = $event"></Rating>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showModal(false)">Close</button>
          <button type="button" class="btn btn-primary" @click.prevent="onSubmit()">{{ bookToEdit ? 'Save changes' : 'Save' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { addBook, editBook, getCategories } from "../services/library.service";
import StarRating from "./StarRating";
import Rating from "./Rating";

export default {
  name: "BookModal",
  components: { Rating, StarRating },
  props: {
    mode: Number,
    bookToEdit: Object | null
  },
  data() {
    return {
      isbn: '',
      title: '',
      author: '',
      shortDescription: '',
      categories: [''],
      rating: 0,
      starRating: -1,
      allCategories: []
    }
  },
  async created() {
    this.allCategories = await getCategories()
  },
  watch: {
    bookToEdit() {
      if (!this.bookToEdit) return
      this.isbn = this.bookToEdit.isbn
      this.title = this.bookToEdit.title
      this.author = this.bookToEdit.author
      this.shortDescription = this.bookToEdit.shortDescription
      this.categories = this.bookToEdit.categories
      this.rating = this.bookToEdit.rating
      this.starRating = this.bookToEdit.starRating
    }
  },
  methods: {
    async onSubmit() {
      const newBook = {
        isbn: this.isbn,
        title: this.title,
        author: this.author,
        shortDescription: this.shortDescription,
        categories: this.categories,
        rating: this.rating,
        starRating: this.starRating
      }
      if (this.bookToEdit) {
        await editBook(newBook)
        this.$emit('editedBook', newBook)
      } else {
        await addBook(newBook)
        this.$emit('addBook', newBook)
      }
      this.showModal(false)
    },
    showModal(show) {
      this.isbn = ''
      this.title = ''
      this.author = ''
      this.shortDescription = ''
      this.categories = ['']
      this.rating = 0
      this.starRating = -1
      this.$emit('showModal', show)
    },
    addCategory() {
      this.categories.push('')
    },
    dropCategory() {
      this.categories.splice(this.categories.length - 1)
    },
  }
}
</script>

<style scoped>

.form-control {
  margin: 20px 0;
}

.form-control label {
  display: block;
}

.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}

.form-control-check label {
  flex: 1;
}

.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
