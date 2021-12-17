<template>
  <div class="column-wrap" v-on:click="$emit('func', id)">
    <div class="column-content">
      <div class="column-header">
        <div></div>
        <h3 class="column-name">{{ name }}</h3>
        <h6 class="column-cardsNumber">Cards: {{ cardsNumber }}</h6>
        <!-- <textarea name="" id="" rows="2"></textarea> -->
      </div>
      <div class="column-cardsList"></div>
      <div>
        <button>
          <span>+</span>
          <span>Add a card</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Column",
  props: ["id", "name", "cardsNumber"],
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
</style>
