<template>
  <div>
    <i v-for="index of Array(5).keys()" :class="`bi ${ index <= starRating ? 'bi-star-fill' : 'bi-star'}`" @click="setStarRating(index)"></i>
  </div>
</template>

<script>
export default {
  name: "StarRating",
  props: {
    starRating: Number,
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
  font-size:28px;
  color: #ffc107;
}
</style>
