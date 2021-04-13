<template>
  <div class="book">
    <h3>{{ book.title }}</h3>
    <h4>{{ book.author }}</h4>
    <p>{{ book.shortDescription }}</p>

    <div class="d-flex justify-content-between">
      <StarRating :star-rating="book.starRating" @setStarRating="$emit('setStarRating', $event)" ></StarRating>
      <Rating :rating="book.rating" @setRating="$emit('setRating', $event)"></Rating>
    </div>
<!--    <button @click="$emit('deleteBook', book.isbn)" class="btn btn-danger">Delete</button>-->
    <button @click="$emit('editBook')" type="button" class="btn btn-warning">Edit</button>
  </div>

</template>

<script>

import StarRating from "./StarRating";
import Rating from "./Rating";

export default {
  name: "BookCard",
  components: {Rating, StarRating},
  props: {
    book: Object
  }
}
</script>

<style scoped>

</style>
