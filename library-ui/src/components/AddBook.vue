<template>

  <button type="button" class="btn btn-primary" @click="$emit('showModal', true)">
    Add book
  </button>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add book</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="$emit('showModal', false)"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inputIsbn" class="form-label">ISBN</label>
            <input v-model="isbn" type="text" class="form-control" id="inputIsbn" placeholder="Please enter book isbn">
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
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('showModal', false)">Close</button>
          <button v-if="!bookToEdit" type="button" class="btn btn-primary" @click.prevent="onSubmit()">Save</button>
          <button v-if="bookToEdit" type="button" class="btn btn-primary" @click.prevent="onSubmit()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { addBook } from "../services/library.service";

export default {
  name: "BookModal",
  props: {
    mode: Number,
    bookToEdit: Object | null
  },
  data() {
    return {
      isbn: '',
      title: '',
      author: '',
      shortDescription: ''
    }
  },
  methods: {
    async onSubmit() {
      if (!this.isbn) {
        alert('Please add isbn')
        return
      }
      const newBook = {
        isbn: this.isbn,
        title: this.title,
        author: this.author,
        shortDescription: this.shortDescription
      }

      await addBook(newBook)

      this.$emit('addBook', newBook)

      this.isbn = ''
      this.title = ''
      this.author = ''
      this.shortDescription = ''
    },
  },
  created() {

  },
  updated() {
    if (!this.bookToEdit) return
    this.isbn = this.bookToEdit.isbn
    this.title = this.bookToEdit.title
    this.author = this.bookToEdit.author
    this.shortDescription = this.bookToEdit.shortDescription
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
