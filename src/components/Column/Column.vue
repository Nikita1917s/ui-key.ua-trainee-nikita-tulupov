<template>
  <div class="column-wrap">
    <div class="column-content">
      <div class="column-header">
        <div class="column-header-inner">
          <EditItems
            :columnId="columnId"
            :columnName="columnName"
            :actionWith="constants.actionWith.column"
            :actionType="constants.actionType.edit"
          />
        </div>
        <div class="editCard" title="Remove column" @click="removeFunc()">
          <b-icon icon="trash"></b-icon>
        </div>

        <h6 class="column-cardsNumber">Cards: {{ cards.length }}</h6>
      </div>
      <div class="column-cardsList">
        <draggable @end="itemMove()" :list="cards" group="cards">
          <Card
            v-for="card in cards"
            :key="card.cardId"
            :cardId="card.cardId"
            :columnId="columnId"
            :columnName="columnName"
            :cardName="card.cardName"
            :cardDescription="card.cardDescription"
            :cardImage="card.cardImage"
          />
        </draggable>
      </div>
      <div>
        <CreateCard :columnId="columnId" />
      </div>
    </div>
  </div>
</template>

<script>
import EditItems from "../EditItems.vue";
import CreateCard from "../Card/CreateCard.vue";
import Card from "../Card/Card.vue";
import constants from "../../modules/constants";
import draggable from "vuedraggable";
import { mapActions } from "vuex";

export default {
  name: "Column",
  props: ["columnId", "columnName", "cards"],
  components: { CreateCard, Card, EditItems, draggable },
  data() {
    return {
      constants: constants,
    };
  },
  methods: {
    ...mapActions(["updateStorage"]),
    itemMove() {
      this.updateStorage({
        columnId: this.columnId,
        cards: this.cards,
        actionWith: constants.actionWith.card,
        actionType: constants.actionType.move,
      });
    },
    removeFunc() {
      this.updateStorage({
        columnId: this.columnId,
        actionWith: constants.actionWith.column,
        actionType: constants.actionType.remove,
      });
    },
  },
};
</script>

<style lang="scss">
.column-wrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  min-width: 275px;
  max-width: 275px;
}
.column-content {
  border: 1px solid #eaf0ff;
  background-color: #ebecf0;
  padding: 0px 8px 10px;
  border-radius: 3px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.column-header {
  display: flex;
  flex-wrap: wrap;
   width: 100%;
}
.column-header-inner {
  width: 85%;
}
.column-content h3 {
  margin: 0;
}
.column-cardsList {
  overflow-y: auto;
  //max-height: 52.5vh;
}
</style>