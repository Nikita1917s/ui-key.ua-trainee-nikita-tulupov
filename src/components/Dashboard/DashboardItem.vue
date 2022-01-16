<template>
  <li>3</li>
</template>

<script>
import DashboardItem from "./DashboardItem.vue";
import constants from "../../modules/constants";
import { mapGetters } from "vuex";

export default {
  name: "DashboardItem",
  components: { DashboardItem },
  props: ["columnName", "columnId", "cardName", "cardDescription", "cardId"],
  data() {
    return {
      edit: false,
      constants: constants,
    };
  },
  computed: mapGetters(["allDashboards"]),

  methods: {},
};
</script>

<style lang="scss">
</style>