<template>
  <Navbar></Navbar>
  <main class="main-section">
    <router-view></router-view>
  </main>

</template>


<script>
import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.main-section {
  max-width: 1200px;
  margin: auto;
}
</style>
