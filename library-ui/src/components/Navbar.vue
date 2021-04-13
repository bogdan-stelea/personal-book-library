<template>
  <nav class="navbar">
    <router-link to="/books" class="navbar-elem" active-class="active">Books</router-link>
    <router-link to="/categories" class="navbar-elem" active-class="active">Categories</router-link>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 3rem;
}

a {
  color: inherit;
  text-decoration: none;
}

.navbar-elem {
  padding: 0.5rem 2rem;
  margin: 1rem;
  font-size: 24px;
  color: grey;
  cursor: pointer;
}

.navbar-elem:hover {
  color: #007bff;
}

.navbar-elem.active {
  color: #007bff;
}


</style>
