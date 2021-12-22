<template>
  <div class="editItem">
    <template v-if="edit">
      <div class="editItemInput">
        <textarea
        title="Press to edit"
          placeholder="Enter a new name…"
          v-model="itemNameDetailed"
          autofocus
        ></textarea>
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

    <template v-else>
      <button @click="editFunc(), setInput()" class="editItemBtn">
        <h3>{{ columnName || cardName }}</h3>
      </button>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditItem",
  props: [
    "columnId",
    "columnName",
    "cardId",
    "cardName",
    "actionWith",
    "actionType",
  ],

  //Data from input
  data() {
    return {
      edit: false,
      itemNameDetailed: "",
      itemTextDetailed: "",
    };
  },
  computed: mapGetters(["allColumns"]),

  methods: {
    ...mapActions(["updateStorage"]),

    //Close block
    editFunc() {
      //console.log(this.itemNameDetailed)
      this.edit = !this.edit;
    },

    submitFunc() {
      //Change item
      this.updateStorage({
        data: this.allColumns,
        columnId: this.columnId || "",
        columnName: this.columnName ? this.itemNameDetailed : "",
        cardId: this.cardId || "",
        cardName:  this.cardName ? this.itemNameDetailed : "",
        actionWith: this.actionWith,
        actionType: this.actionType,
      });
    },

    setInput() {
      this.itemNameDetailed = this.columnName || this.cardName;
    },
    //Auto focus on open
    focusMyElement() {
      if (this.edit) {
        this.$refs.focusThis.focus();
      }
    },
  },
};
</script>

<style lang="scss">
.editItem {
  margin: 10px 0 5px;
  width: 100%;
}
.editItemBtn,
.editItemInput {
  width: 100%;
  text-align: left;
  border-radius: 3px;
}
.editItemInputBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.editItemInput textarea {
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  width: 100%;
  padding: 6px 8px 2px;
  border-radius: 3px;
  background-color: #ebecf0;
}
.editItemBtn:hover,
.editItemdBtn:active {
  background: #091e4221;
}
</style>