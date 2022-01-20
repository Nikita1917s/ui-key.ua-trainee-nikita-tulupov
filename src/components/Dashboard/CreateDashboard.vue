<template>
  <div class="dashboardsBtn">
    <b-button variant="warning" @click="(modalShow = !modalShow), resetInput()"
      >Dashboards</b-button
    >
    <b-modal v-model="modalShow" @shown="focusMyElement">
      <template #modal-header>
        <h5>Dashboards</h5>
      </template>

      <div class="dashboardList">
        <ul>
          <DashboardItem
            v-for="dashboardItem in dashboardList"
            :key="dashboardItem.dashboardId"
            :dashboardId="dashboardItem.dashboardId"
            :dashboardName="dashboardItem.dashboardName"
          />
        </ul>
      </div>

      <input
        class="modalInput"
        type="text"
        variant="success"
        placeholder="New Dashboard name"
        ref="focusThis"
        v-model="dashboardName"
      />
      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="primary" @click="submit(ok)">
          Create Dashboard
        </b-button>
        <b-button size="sm" variant="secondary" @click="cancel()"
          >Cancel</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import { v4 as uuid_v4 } from "uuid";
import { mapActions, mapGetters } from "vuex";
import DashboardItem from "./DashboardItem.vue";

export default {
  name: "CreateDashboard",
  props: ["show", "actionWith", "actionType"],
  computed: mapGetters(["allColumns", "dashboardList"]),
  components: { DashboardItem },

  //Data from input
  data() {
    return {
      modalShow: this.show || false,
      dashboardName: "",
    };
  },

  methods: {
    resetInput() {
      if (this.modalShow) {
        this.dashboardName = "";
      }
    },
    ...mapActions(["updateStorage"]),

    submit(ok) {
      if (this.dashboardName) {
        ok();

        this.updateStorage({
          dashboardId: uuid_v4(),
          dashboardName: this.dashboardName,
          columns: [],
          actionWith: this.actionWith,
          actionType: this.actionType,
        });

        this.resetInput();
      }
    },

    focusMyElement() {
      this.$refs.focusThis.focus();
    },
  },
};
</script>

<style lang="scss">
.dashboardsBtn {
  margin: 0 15px 0 0;
}
.dashboardList ul {
  list-style: none;
}
.dashboardList ul li {
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #eaf0ff;
  background-color: #ebecf0;
  margin: 0 0 10px;
  padding: 5px;
  font-size: 18px;
}

.dashboardList ul li:hover {
  background-color: #ebf0ed;
}

.modalInput {
  width: 100%;
  border: 2px solid rgba(0, 0, 255, 0.5);
  border-radius: 5px;
  padding: 2.5px;
}
</style>