<template>
  <div class="row">
    <div v-for="category in categories" :key="category._id" class="col-md-4 p-2" @click="redirect(category)">
      <div class="card w-100 h-100">
        <div class="card-body d-flex flex-column justify-content-end">
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories } from "../services/library.service";

export default {
  name: "Categories",
  data() {
    return {
      categories: []
    }
  },
  methods: {
    redirect(category) {
      this.$router.push({ name: 'Books', query: { category: category.name } })
    }
  },
  async created() {
    this.categories = await getCategories()
  }
}
</script>

<style scoped>

</style>
