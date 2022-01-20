<template>
  <li class="dashboardInner">
    <div class="flex" v-if="!edit">
      <p class="dashboardTitle" @click="selectionFunc">{{ dashboardName }}</p>

      <div class="editCard" title="Edit Dashboard">
        <b-icon icon="pencil" @click="editFunc(), setInput()"></b-icon>
      </div>

      <div class="editCard" title="Remove Dashboard" @click="removeFunc()">
        <b-icon icon="trash"></b-icon>
      </div>
    </div>
    <div div class="editItem">
      <template v-if="edit">
        <div class="editItemInput">
          <input
            title="Press to edit"
            placeholder="Enter a new name…"
            v-model="itemNameDetailed"
          />
          <div class="editItemInputBtn">
            <b-button
              size="sm"
              variant="primary"
              @click="submitFunc(), editFunc()"
            >
              Save
            </b-button>
            <b-button size="sm" variant="secondary" @click="editFunc()"
              >Cancel</b-button
            >
          </div>
        </div>
      </template>
    </div>
  </li>
</template>

<script>
import constants from "../../modules/constants";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardItem",
  props: ["dashboardId", "dashboardName"],
  data() {
    return {
      edit: false,
      constants: constants,
    };
  },
  computed: mapGetters(["dashboardList"]),

  methods: {
    ...mapActions(["updateStorage"]),

    selectionFunc() {
      this.updateStorage({
        dashboardId: this.dashboardId,
        dashboardName: this.dashboardName,
        actionWith: constants.actionWith.dashboard,
        actionType: constants.actionType.select,
      });
    },
    editFunc() {
      this.edit = !this.edit;
    },

    submitFunc() {
      if (this.itemNameDetailed) {
        this.updateStorage({
          dashboardId: this.dashboardId,
          dashboardName: this.dashboardName ? this.itemNameDetailed : "",
          actionWith: constants.actionWith.dashboard,
          actionType: constants.actionType.edit,
        });
      }
    },
    removeFunc() {
      this.updateStorage({
        dashboardId: this.dashboardId,
        actionWith: constants.actionWith.dashboard,
        actionType: constants.actionType.remove,
      });
    },

    setInput() {
      this.itemNameDetailed = this.dashboardName;
    },
  },
};
</script>

<style lang="scss">
.dashboardInner p {
  margin: 0;
}
.dashboardInner input {
  width: 100%;
  border: 2px solid rgba(0, 0, 255, 0.5);
  border-radius: 5px;
  padding: 2.5px;
}
.dashboardInner .editItem {
  margin: 0;
}
.flex {
  display: flex;
}
.dashboardTitle {
  width: 70%;
}
</style>