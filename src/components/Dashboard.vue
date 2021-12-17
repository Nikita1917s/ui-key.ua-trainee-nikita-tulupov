<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <h4>Number of cards: {{ allColumns.length }}</h4>
    <div class="dashboard-list">
      <Column
        v-for="columns in allColumns"
        :key="columns.id"
        :id="columns.id"
        :name="columns.name"
        :cardsNumber="allCards.length"
        v-on:click="func(id)"
      />
    </div>
  </div>
</template>

<script>
import Column from "./Column/Column.vue";
import { mapGetters, mapActions } from "vuex";
//mapMutations
export default {
  components: { Column },
  name: "Dashboard",
  methods: {
    ...mapActions([]),
    func(id) {
      console.log(id);
    },
  },
  computed: mapGetters(["allColumns", "allCards"]),
};
</script>

<style lang="scss">
.dashboard-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
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
