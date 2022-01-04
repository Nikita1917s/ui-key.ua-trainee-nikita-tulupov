<template>
  <a class="card">
    <div class="cardWrap">
      <div class="cardInner">
        <div class="cardTag">
          <span></span>
        </div>
        <div class="editCard" title="Edit card">
          <b-icon icon="pencil"></b-icon>
        </div>
        <CardDetailed
          :cardId="cardId"
          :columnId="columnId"
          :columnName="columnName"
          :cardName="cardName"
          :cardDescription="cardDescription"
        />
      </div>
    </div>
  </a>
</template>

<script>
import CardDetailed from "./CardDetailed.vue";
export default {
  name: "Card",
  components: { CardDetailed },
  props: ["columnName", "columnId", "cardName", "cardDescription", "cardId"],
};
</script>

<style lang="scss">
.card {
  margin: 0 0 10px;
  border-radius: 3px;
}
.cardWrap {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: #fff;
  color: #172b4d;
  text-decoration: none;
  border-radius: 3px;
}
.cardWrap:hover {
  background-color: #f4f5f7;
}
.card:hover {
  text-decoration: none !important;
}
.cardInner {
  padding: 6px 8px 2px;
  display: flex;
  flex-wrap: wrap;
}
.cardTag {
  width: 85%;
  display: flex;
  align-items: center;
}
.cardTag span {
  float: left;
  font-size: 12px;
  font-weight: 700;
  height: 8px;
  line-height: 100px;
  margin: 0 4px 4px 0;
  max-width: 40px;
  min-width: 40px;
  padding: 0;
  text-shadow: none;
  width: auto;
  background: #61bd4f;
  border-radius: 4px;
}
.editCard {
  width: 15%;
  text-align: center;
  color: gray;
  border-radius: 5px;
}
.editCard:hover {
  color: #172b4d;
  background: rgb(182, 182, 182);
}

.cardInner h4 {
  width: 100%;
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
</style>
