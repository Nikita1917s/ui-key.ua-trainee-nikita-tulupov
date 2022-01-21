<template>
  <div class="home">
    <template v-if="logedIn">
      <Dashboard />
    </template>
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard/Dashboard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["dashboardGet", "getUser"]),
  },
  components: {
    Dashboard,
  },
  computed: mapGetters(["logedIn"]),
  async mounted() {
    this.dashboardGet();

    if (
      (await this.getUser()) === false ||
      (await this.getUser()) === undefined
    ) {
      this.$router.push({ path: "Authorisation" });
    }
  },
};
</script>


<style lang="scss">
</style>