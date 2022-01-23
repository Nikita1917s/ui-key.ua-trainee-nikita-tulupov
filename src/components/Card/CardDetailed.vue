<template>
  <div class="cardDetailed" title="Open card">
    <div
      class="cardDetailedInner"
      @click="(modalShow = !modalShow), setInput()"
    >
      <h4>{{ cardName }}</h4>
      <div>
        <b-icon icon="text-left" aria-hidden="true"></b-icon>
      </div>
      <div v-if="this.cardImage" class="cardImageOuter">
        <div class="cardImageOuterBlock">
          <img :src="this.cardImage" alt="Image attached to the Card" />
        </div>
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
            <EditItems
              :columnId="columnId"
              :cardId="cardId"
              :cardName="cardName"
              :actionWith="constants.actionWith.card"
              :actionType="constants.actionType.edit"
            />
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
          <b-button size="sm" variant="secondary" @click="editFunc()">{{
            !this.edit ? "Edit" : "Close Edit"
          }}</b-button>
        </div>
      </div>
      <div class="cardModal">
        <div class="cardModalIcon"></div>
        <div class="cardModalHeader">
          <p>
            {{
              this.cardDescription || "Press Edit button to add descpription"
            }}
          </p>

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

          <div v-if="this.fileLink || this.cardImg" class="cardImageInner">
            <img
              :src="this.fileLink || this.cardImg || this.cardImage"
              alt="Image attached to the Card"
            />
          </div>

          <form id="cardImageForm" class="cardImageForm">
            <v-file-input
              v-model="file"
              placeholder="Select an image to upload"
              accept="image/*"
              id="cardImageInput"
              @change="uploadFile"
            />
          </form>
        </div>
      </div>

      <template #modal-footer="{ cancel }">
        <div class="cardAction">
          <div class="cardActionInner">
            <b-button size="sm" variant="danger" @click="removeFunc()">
              Remove card
            </b-button>
            <b-button size="sm" variant="info" @click="removeImg()">
              Remove image
            </b-button>
          </div>
          <div class="cardActionInner">
            <b-button size="sm" variant="primary" @click="submitFunc()">
              Save card
            </b-button>
            <b-button size="sm" variant="secondary" @click="close(cancel)"
              >Close</b-button
            >
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import EditItems from "../EditItems.vue";
import constants from "../../modules/constants";
import { v4 as uuid_v4 } from "uuid";

export default {
  name: "CardDetailed",
  props: [
    "columnName",
    "columnId",
    "cardId",
    "cardName",
    "cardDescription",
    "cardImage",
  ],
  components: { EditItems },
  computed: mapGetters(["fileLink"]),
  //Data from input
  data() {
    return {
      modalShow: false,
      edit: false,
      cardDescriptionDetailed: "",
      constants: constants,
      file: null,
      image: null,
      cardImg: this.cardImage || "",
      imagesArr: [],
    };
  },

  methods: {
    ...mapActions(["updateStorage", "updateS3"]),

    editFunc() {
      this.edit = !this.edit;
    },

    submitFunc() {
      this.fileLink && (this.cardImg = this.fileLink);
      this.updateStorage({
        columnId: this.columnId,
        cardId: this.cardId,
        cardName: this.cardName,
        cardDescription: this.cardDescriptionDetailed,
        cardImage: this.cardImg || this.fileLink,
        actionWith: constants.actionWith.card,
        actionType: constants.actionType.edit,
      });

      if (this.imagesArr.length > 0) {
        this.updateS3({
          imageArr: this.imagesArr,
          cardImage: this.cardImage,
          actionType: constants.actionType.remove,
        });
      }
    },

    removeFunc() {
      this.updateStorage({
        columnId: this.columnId,
        cardId: this.cardId,
        actionWith: constants.actionWith.card,
        actionType: constants.actionType.remove,
      });
    },

    setInput() {
      this.cardDescriptionDetailed = this.cardDescription;
    },

    focusMyElement() {
      if (this.edit) {
        this.$refs.focusThis.focus();
      }
    },

    async uploadFile() {
      if (this.file) {
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = (e) => {
          this.image = e.target.result;
          const parts = this.image.split(";");
          const data = parts[1];
          const imageName = `${uuid_v4()}--${this.file.name}`;

          this.imagesArr.push({ Key: `${imageName}` });

          if (this.imagesArr.length > 0) {
            this.updateS3({
              fileId: imageName,
              file: data,
              fileType: this.file.type,
              actionType: constants.actionType.add,
            });
          }
          this.fileLink && (this.cardImg = this.fileLink);
        };
      }
    },

    close(cancel) {
      cancel();
      this.cardImg = this.cardImage;
      this.updateS3({});

      this.updateS3({
        imageArr: this.imagesArr,
        cardImage: this.cardImage,
        actionType: constants.actionType.remove,
      });
    },

    removeImg() {
      this.imagesArr.push({ Key: `${this.cardImg || this.fileLink}` });
      this.updateS3({});
      this.cardImg = "";
    },
  },
};
</script>

<style lang="scss">
.cardDetailed {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cardDetailedInner {
  width: 100%;
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
.cardModalHeader p {
  width: 100%;
}
.cardModal {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
}
.cardModalIcon {
  width: 7.5%;
  text-align: center;
}
.cardModalHeader {
  width: 92.5%;
  display: flex;
  flex-wrap: wrap;
}
.cardModalHeader textarea {
  resize: none;
  max-height: 40vh;
  min-height: 10vh;
  overflow: auto;
}
.cardImageForm {
  min-width: 51%;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cardImageInner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50%;
  max-width: 50%;
  max-height: 50%;
  object-fit: cover;
  margin: 0 0 1rem;
}
.cardImageInner img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.cardImageOuter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  object-fit: cover;
  margin: 0 0 0.25rem;
  flex-wrap: wrap;
  overflow: hidden;
}
.cardImageOuterBlock {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  overflow: hidden;
}
.cardImageOuter img {
  width: 100%;
  height: auto;
  overflow: hidden;
  object-fit: contain;
}
.cardAction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.cardAction button {
  margin: 0 10px;
}
</style>