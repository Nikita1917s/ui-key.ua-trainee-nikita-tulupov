<template>
  <div>
    <b-button @click="(modalShow = !modalShow), resetInput()"
      >Create column</b-button
    >
    <b-modal v-model="modalShow" @shown="focusMyElement">
      <template #modal-header>
        <h5>Create new column</h5>
      </template>

      <input
        class="modalInput"
        type="text"
        variant="success"
        placeholder="Column name"
        ref="focusThis"
        v-model="columnName"
      />
      <template #modal-footer="{ ok, cancel }">
        <b-button size="sm" variant="primary" @click="submitFunc(ok)">
          Create column
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
import { mapActions } from "vuex";

export default {
  name: "CreateColumn",
  props: ["actionWith", "actionType"],

  //Data from input
  data() {
    return {
      modalShow: false,
      columnName: "",
    };
  },
  methods: {
    resetInput() {
      if (this.modalShow) {
        this.columnName = "";
      }
    },
    ...mapActions(["updateStorage"]),

    submitFunc(ok) {
      if (this.columnName) {
        ok();

        //Create new Column
        this.updateStorage({
          columnId: uuid_v4(),
          columnName: this.columnName,
          cards: [],
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
.modalInput {
  width: 100%;
  border: 2px solid rgba(0, 0, 255, 0.5);
  border-radius: 5px;
  padding: 2.5px;
}
</style>