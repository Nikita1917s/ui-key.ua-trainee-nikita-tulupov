<template>
  <header class="topHeader">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#" class="h1-text">Trello Nikita</b-navbar-brand>

      <template v-if="logedIn">
        <!-- Create dashboard button -->
        <CreateDashboard
          :actionWith="constants.actionWith.dashboard"
          :actionType="constants.actionType.add"
        />

        <!-- Create column button -->
        <CreateColunm
          v-if="dashboardId"
          :actionWith="constants.actionWith.column"
          :actionType="constants.actionType.add"
        />
        <b-navbar-brand v-else class="h2-text"
          >Please create a Dashboard first</b-navbar-brand
        >

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <!-- check props -->
            <template v-if="loggedIn">
              <b-nav-item-dropdown right>
                <template #button-content>
                  <em class="userName-header">{{ userName || "User Name" }}</em>
                </template>

                <b-dropdown-item
                  href="#"
                  @click="submitFunc"
                  >Sign Out</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </template>

            <b-button
              variant="warning"
              size="bg"
              v-else
              >Sign In</b-button
            >
          </b-navbar-nav>
        </b-collapse>
      </template>
    </b-navbar>
  </header>
</template>

<script>
import CreateDashboard from "./Dashboard/CreateDashboard.vue";
import CreateColunm from "./Column/CreateColumn.vue";
import constants from "../modules/constants";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",
  components: { CreateDashboard, CreateColunm },
  computed: mapGetters(["dashboardId", "userName", "logedIn"]),
  props: ["loggedIn"],
  data: () => ({
    constants: constants,
    register: true,
  }),
  methods: {
    ...mapActions(["logOutUser"]),
    submitFunc() {
      this.logOutUser();
      this.$router.push({ path: "Authorisation" });
    },
  },
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
