<template>
  <div>
    <Header v-bind:loggedIn="loggedIn" v-on:signInOut="loggedIn = !loggedIn" />
    <div class="body-block">
      <router-view />
    </div>
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
  padding: 56px 1rem 10px;
  background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2048x1152/154693945019a4593db450f8db58bb38/photo-1637083215354-9a4509587173.jpg");
  height: 100vh;
}
::-webkit-scrollbar {
  background-color: rgba(255, 195, 139, 0.75);
  height: 10px;
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(112, 122, 144, 0.75);
  border-radius: 15px;
}
</style>
