<template>
  <li>{{dashboardName}}</li>
</template>

<script>
import DashboardItem from "./DashboardItem.vue";
import constants from "../../modules/constants";
import { mapGetters } from "vuex";

export default {
  name: "DashboardItem",
  components: { DashboardItem },
  props: ["dashboardName", "dashboardId"],
  data() {
    return {
      edit: false,
      constants: constants
    };
  },
  computed: mapGetters(["dashboardList"]),

  methods: {

  },
};
</script>

<style lang="scss">
</style>