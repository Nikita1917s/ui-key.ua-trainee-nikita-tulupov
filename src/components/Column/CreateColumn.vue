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
        <!-- Emulate built in modal footer ok and cancel button actions -->
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
import { mapMutations } from "vuex";
import { v4 as uuid_v4 } from "uuid";

export default {
  name: "CreateColumn",

  //Data from input
  data() {
    return {
      modalShow: false,
      columnName: "",
    };
  },
  methods: {
    //Reset input after modal window closed
    resetInput() {
      if (this.modalShow) {
        this.columnName = "";
      }
    },

    //Get addColumn func
    ...mapMutations(["addColumns"]),

    submitFunc(ok) {
      // Add a column if input field.value.length > 0
      if (this.columnName) {
        //Close modal
        ok();

        //Create new Column
        this.addColumns({
          columnId: uuid_v4(),
          columnName: this.columnName,
          cards: [],
          actionFunc: "addColumn",
          remove: false,
        });

        this.resetInput();
      }
    },

    //Auto focus on open
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
