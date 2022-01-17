<template>
  <div class="dashboard">
    <template v-if="dashboardName">
      <h2>Dashboard name: {{ dashboardName }}</h2>
      <h4>Number of columns: {{ allColumns.length }}</h4>
    </template>

    <template v-if="!dashboardName && !this.loading">
      <h2>Create a new Dashboard</h2>
      <CreateDashboard
        :show="true"
        :actionWith="constants.actionWith.dashboard"
        :actionType="constants.actionType.add"
      />
    </template>

    <Loader v-if="!dashboardName && this.loading" />

    <div>
      <draggable
        @end="itemMove()"
        :list="this.allColumns"
        group="columns"
        class="dashboard-list"
      >
        <Column
          v-for="columns in allColumns"
          :key="columns.columnId"
          :columnId="columns.columnId"
          :columnName="columns.columnName"
          :cards="columns.cards"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
import Column from "../Column/Column.vue";
import constants from "../../modules/constants";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import CreateDashboard from "./CreateDashboard.vue";
import Loader from "../Loader.vue";

export default {
  components: { CreateDashboard, Column, draggable, Loader },
  name: "Dashboard",
  computed: mapGetters(["allColumns", "dashboardName"]),
  data() {
    return {
      constants: constants,
      loading: true,
    };
  },
  mounted() {
    this.loaded();
  },
  methods: {
    ...mapActions(["updateStorage"]),
    itemMove() {
      this.updateStorage({
        columnId: this.columnId,
        actionWith: constants.actionWith.column,
        actionType: constants.actionType.move
      });
    },
    loaded() {
      setTimeout(() => {
        this.loading = false;
        return this.loading;
      }, 1500);
    },
  },
};
</script>

<style lang="scss">
.dashboard {
  max-height: 100vh;
  box-sizing: border-box;
}
.dashboard-list {
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  overflow-y: scroll;
}
.dashboard-list .column-wrap {
  margin: 7.5px;
}
.dashboard-list .column-wrap:first-child {
  margin: 7.5px 7.5px 7.5px 0px;
}
.dashboard-list .column-wrap:last-child {
  margin: 7.5px 0px 7.5px 7.5px;
}
</style>