<template>
  <div class="column-wrap">
    <div class="column-content">
      <div class="column-header">
        <EditItems
          :columnId="columnId"
          :columnName="columnName"
          :actionWith="constants.actionWith.column"
          :actionType="constants.actionType.edit"
        />
        <h6 class="column-cardsNumber">Cards: {{ cards.length }}</h6>
      </div>
      <div class="column-cardsList">
        <Card
          v-for="card in cards"
          :key="card.cardId"
          :cardId="card.cardId"
          :columnId="columnId"
          :columnName="columnName"
          :cardName="card.cardName"
          :cardDescription="card.cardDescription"
        />
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


import { mapGetters } from "vuex";

export default {
  name: "Column",
  props: ["columnId", "columnName", "cards"],
  components: { CreateCard, Card, EditItems },
  computed: mapGetters(["allColumns"]),
  data() {
    return {
      constants: constants,
    };
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
}
.column-content {
  border: 1px solid #eaf0ff;
  background-color: #ebecf0;
  padding: 0px 8px 10px;
  border-radius: 3px;
}
.column-content h3 {
  margin: 0;
}
.column-cardsList {
  overflow-y: auto;
  max-height: 52.5vh;
}
</style>
