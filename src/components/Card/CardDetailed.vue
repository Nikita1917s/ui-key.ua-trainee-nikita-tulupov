<template>
  <div class="cardDetailed" title="Open card">
    <div @click="(modalShow = !modalShow), setInput()">
      <h4>{{ cardName }}</h4>
      <div>
        <b-icon icon="text-left" aria-hidden="true"></b-icon>
      </div>
    </div>
    <b-modal
      size="lg"
      v-model="modalShow"
      @shown="focusMyElement"
      class="cardModal"
    >
      <template #modal-header>
        <div class="cardModal">
          <div class="cardModalIcon">
            <b-icon icon="layout-text-window"></b-icon>
          </div>
          <div class="cardModalHeader">
            <h4>{{ cardName }}</h4>
            <h6>In column: {{ columnName }}</h6>
          </div>
        </div>
      </template>

      <div class="cardModal">
        <div class="cardModalIcon">
          <b-icon icon="text-center"></b-icon>
        </div>
        <div class="cardModalHeader">
          <h5>Description</h5>
          <b-button size="sm" variant="secondary" @click="editFunc()"
            >Edit</b-button
          >
        </div>
      </div>
      <div class="cardModal">
        <div class="cardModalIcon"></div>
        <div class="cardModalHeader">
          <p>{{ this.cardDescription }}</p>

          <template v-if="this.edit">
            <textarea
              class="modalInput"
              type="text"
              variant="success"
              placeholder="Add a more detailed description…"
              ref="focusThis"
              v-model="cardDescriptionDetailed"
            />
          </template>
        </div>
      </div>

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="primary" @click="submitFunc()">
          Save card
        </b-button>
        <b-button size="sm" variant="secondary" @click="cancel()"
          >Close</b-button
        >
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CardDetailed",
  props: ["columnName", "columnId", "cardId", "cardName", "cardDescription"],

  //Data from input
  data() {
    return {
      modalShow: false,
      edit: false,
      cardDescriptionDetailed: "",
    };
  },
  computed: mapGetters(["allColumns"]),

  methods: {
    ...mapActions(["updateStorage"]),

    //Close block
    editFunc() {
      this.edit = !this.edit;
    },

    submitFunc() {
      //Create new Column
      this.updateStorage({
        data: this.allColumns,
        columnId: this.columnId,
        cardId: this.cardId,
        cardName: this.cardName,
        cardDescription: this.cardDescriptionDetailed,
        actionWith: "card",
        actionType: "edit",
        remove: false,
      });
    },

    setInput() {
      this.cardDescriptionDetailed = this.cardDescription;
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
.cardDetailed {
  width: 100%;
  cursor: pointer;
}
.cardModal h4,
.cardModal h6 {
  width: 100%;
  margin: 0;
}
.cardModalHeader h5 {
  margin: 0 10px 0 0;
  width: auto;
}
.cardModal {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
}
.cardModalIcon {
  width: 5%;
  text-align: center;
}
.cardModalHeader {
  width: 95%;
  display: flex;
  flex-wrap: wrap;
}
.cardModalHeader textarea {
  resize: none;
  min-height: 40vh;
  overflow: auto;
}
</style>