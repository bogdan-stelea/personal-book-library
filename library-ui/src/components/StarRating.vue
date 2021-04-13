<template>
  <div>
    <i v-for="index of Array(5).keys()"
       :class="`bi ${ indexHovered !== -1 ? index <= indexHovered ? 'bi-star-fill' : 'bi-star' : index <= starRating ? 'bi-star-fill' : 'bi-star'}`"
       @click="setStarRating(index)"
       @mouseenter="indexHovered = index"
       @mouseleave="indexHovered = -1"></i>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    starRating: Number,
  },
  data() {
    return {
      indexHovered: -1
    }
  },
  methods: {
    setStarRating(starRating) {
      this.$emit('setStarRating', starRating)
    }
  }
}
</script>

<style scoped>
i {
  font-size: 28px;
  color: #ffc107;
  cursor: pointer;
}
</style>
