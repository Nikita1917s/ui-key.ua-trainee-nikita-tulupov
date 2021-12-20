<template>
  <div class="column-wrap">
    <div class="column-content">
      <div class="column-header">
        <div></div>
        <h3 class="column-name">{{ columnName }}</h3>
        <h6 class="column-cardsNumber">Cards: {{ cards.length }}</h6>
        <!-- <textarea name="" id="" rows="2"></textarea> -->
      </div>
      <div class="column-cardsList">
        <Card
          v-for="card in cards"
          :key="card.cardId"
          :columnId="columnId.columnId"
          :CardName="card.cardName"
          :CardDescription="card.cardDescription"
        />
      </div>
      <div>
        <CreateCard :columnId="columnId" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateCard from "../Card/CreateCard.vue";
import Card from "../Card/Card.vue";
import { mapGetters } from "vuex";


export default {
  name: "Column",
  props: ["columnId", "columnName", "cards"],
  components: { CreateCard, Card },
  computed: mapGetters(["allColumns"]),
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
.column-cardsList{
  overflow-y: auto;
  max-height: 52.5vh;
}
</style>
