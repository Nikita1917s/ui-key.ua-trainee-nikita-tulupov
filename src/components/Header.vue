<template>
  <header class="topHeader">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" class="h1-text">Trello Nikita</b-navbar-brand>

      <!-- Create column button -->
      <CreateColunm />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- check props -->
          <template v-if="loggedIn">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em class="userName-header">User Name</em>
              </template>

              <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
              <b-dropdown-item
                href="#"
                v-on:click="$emit('signInOut', loggedIn)"
                >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </template>

          <b-button v-else v-on:click="$emit('signInOut', loggedIn)"
            >Log In</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import CreateColunm from "./Column/CreateColumn.vue";

export default {
  name: "Header",
  components: { CreateColunm },
  props: ["loggedIn"],
};
</script>

<style>
.topHeader {
  width: 100%;
  top: 0;
  position: fixed;
  z-index: 999;
}
.h1-text {
  font-size: 32px !important;
}
.topHeader .navbar {
  padding: 0 1rem;
}
.userName-header {
  font-size: 24px !important;
  color: #fff;
  font-weight: 500;
}
</style>

// Create header with: // - buttons "Sign in" or "Logout" when you are already
signed in. // - place in the corner with the name of assigned user and icon of
this user
