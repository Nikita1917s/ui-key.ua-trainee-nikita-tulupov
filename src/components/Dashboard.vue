<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <h4>Number of columns: {{ allColumns.length}}</h4>
    <div class="dashboard-list">
      <Column
        v-for="columns in allColumns"
        :key="columns.columnId"
        :columnId="columns.columnId"
        :columnName="columns.columnName"
        :cards="columns.cards"
      />
    </div>
  </div>
</template>

<script>
import Column from "./Column/Column.vue";
import { mapGetters } from "vuex";

export default {
  components: { Column },
  name: "Dashboard",
  computed: mapGetters(["allColumns", "allCards"]),
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
