<template>
  <div>
    <Header v-bind:loggedIn="loggedIn" v-on:signInOut="loggedIn = !loggedIn" />
    <div class="body-block"></div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",

  components: {
    Header,
  },

  data: () => ({
    loggedIn: true,
  }),
};
</script>

<style lang="scss">
.body-block {
  padding: 56px 0;
}
</style>
