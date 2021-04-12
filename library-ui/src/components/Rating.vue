<template>
  <div>
    <i v-if="rating !== -1" class="bi bi-hand-thumbs-down dislike" @click="setRating(-1)"></i>
    <i v-if="rating === -1" class="bi bi-hand-thumbs-down-fill dislike" @click="setRating(0)"></i>
    <i v-if="rating !== 1" class="bi bi-hand-thumbs-up like" @click="setRating(1)"></i>
    <i v-if="rating === 1" class="bi bi-hand-thumbs-up-fill like" @click="setRating(0)"></i>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    rating: Number
  },
  methods: {
    setRating(rating) {
      this.$emit('setRating', rating)
    }
  }
}
</script>

<style scoped>
  i {
    font-size: 28px;
    margin: 0 0.35rem;
  }
  .dislike {
    color: #dc3545;
  }
  .like {
    color: #0d6efd;
  }
</style>
