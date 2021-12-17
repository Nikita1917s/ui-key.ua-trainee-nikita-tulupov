<template>
  <div>
    <b-button @click="modalShow = !modalShow">Create column</b-button>
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
        <b-button size="sm" variant="primary" @click="ok(), submitFunc()">
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
export default {
  name: "CreateColumn",
  data() {
    return {
      modalShow: false,
      columnName: ''
    };
  },
  methods: {
    ...mapMutations(["addColumns"]),
    submitFunc() {
      this.addColumns({
        id: Date.now(),
        name: this.columnName,
      });
      this.columnName = '';
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
