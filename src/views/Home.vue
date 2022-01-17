<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from "../components/Dashboard/Dashboard.vue";
import { mapActions } from "vuex";
export default {
  name: "Home",
  methods: {
    ...mapActions(["dashboardGet"]),
  },
  components: {
    Dashboard,
  },
  async mounted() {
    this.dashboardGet()
  },
};
</script>


<style lang="scss">
</style>