<template>
  <div class="card" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <div :class="`actions p-1 ${isHovered ? 'show' : ''}`">
      <i class="bi bi-pencil-square fs-4 mr-2" @click="$emit('editBook')" style="color: #ffc107"></i>
      <i class="bi bi-trash-fill fs-4" @click="$emit('deleteBook', book.isbn)" style="color: #dc3545"></i>
    </div>
    <div class="card-img-top" style="height: 320px">
      <img v-if="book.imageUrl" :src="book.imageUrl" alt="asd" style="width: 100%; height: 100%; object-fit: contain">
      <svg v-if="!book.imageUrl" class="bd-placeholder-img card-img-top"
           width="100%"
           height="100%"
           xmlns="http://www.w3.org/2000/svg"
           role="img"
           aria-label="Placeholder: Image cap"
           preserveAspectRatio="xMidYMid slice"
           focusable="false"><title>Placeholder</title>
        <rect width="100%" height="100%" fill="#E9EBEC"></rect>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">No image provided</text>
      </svg>
    </div>
    <div class="card-body d-flex flex-column justify-content-end">
      <div class="book">
        <h4 class="text-truncate fw-bold" :title="book.title" style="font-weight: 500">{{ book.title }}</h4>
        <h5>{{ book.author }}</h5>
        <p>{{ book.shortDescription }}</p>
        <div class="d-flex justify-content-between">
          <StarRating :star-rating="book.starRating" @setStarRating="$emit('setStarRating', $event)"></StarRating>
          <Rating :rating="book.rating" @setRating="$emit('setRating', $event)"></Rating>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import StarRating from "./StarRating";
import Rating from "./Rating";

export default {
  name: "BookCard",
  components: { Rating, StarRating },
  props: {
    book: Object
  },
  data() {
    return {
      isHovered: false
    }
  }
}
</script>

<style scoped>
i {
  font-size: 28px;
  margin: 0 0.35rem;
  cursor: pointer;
}

.actions {
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  border: 1px solid #e5e5e540;
  background-color: rgba(0, 0, 0, .8);
  border-radius: 4px;
  transition-duration: 200ms;
}

.actions.show {
  opacity: 1;
}

</style>
