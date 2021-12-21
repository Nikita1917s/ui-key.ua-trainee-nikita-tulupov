<template>
  <div class="createCard">
    <template v-if="cardInputShow">
      <div class="createCardInput">
        <textarea
          placeholder="Enter a title for this card…"
          v-model="cardName"
          autofocus
        ></textarea>
        <div class="createCardInputBtn">
          <b-button
            size="sm"
            variant="primary"
            @click="submitFunc(), showInput()"
          >
            Create card
          </b-button>
          <b-button size="sm" variant="secondary" @click="showInput()"
            >Cancel</b-button
          >
        </div>
      </div>
    </template>

    <template v-else>
      <button @click="showInput()" class="createCardBtn">
        <span class="plus">+ </span>
        <span>Add a card</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import { v4 as uuid_v4 } from "uuid";

export default {
  name: "CreateCard",
  props: ["columnId"],
  data: () => ({
    cardName: "",

    //Show/Hide card name input field
    cardInputShow: false,
  }),
  computed: mapGetters(["allColumns", "allCards"]),

  methods: {
    //Get addColumn func
    ...mapMutations(["addCard"]),
    ...mapActions(["functionCard"]),
    showInput() {
      this.cardInputShow = !this.cardInputShow;
      this.cardName = "";
    },
    submitFunc() {
      // Add a column if input field.value.length > 0
      if (this.cardName) {
        this.functionCard({
          data: this.allColumns,
          columnId: this.columnId,
          cardId: uuid_v4(),
          cardName: this.cardName,
          cardDescription: "",
          remove: false,
          actionFunc: "addCard",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.createCard {
  margin: 10px 0 0 0;
}
.createCardBtn,
.createCardInput {
  padding: 5px;
  width: 100%;
  text-align: left;
  border-radius: 3px;
}
.createCardInputBtn {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 5px 0 0;
}
.createCardInput textarea {
  overflow: hidden;
  overflow-wrap: break-word;
  resize: none;
  height: 54px;
  width: 100%;
  background: white;
  padding: 6px 8px 2px;
  border-radius: 3px;
}
.createCardBtn:hover,
.createCardBtn:active {
  background: #091e4221;
}
.plus {
  font-size: 1.5rem;
}
</style>
