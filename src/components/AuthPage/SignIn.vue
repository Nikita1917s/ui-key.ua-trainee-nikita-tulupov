<template>
  <div>
    <b-modal
      no-close-on-backdrop
      no-close-on-esc
      hide-header-close
      :aria-hidden="true"
      :data-keyboard="false"
      :clickToClose="false"
      v-model="modalShow"
      @shown="focusMyElement"
    >
      <template #modal-header>
        <div class="signInForm">
          <h3>Welcome to the Trello-Nikita</h3>
          <h5>Please Sign in or Register</h5>
        </div>
      </template>

      <div class="modalInputBlock">
        <label for="nameInput">Your name</label>
        <input
          name="nameInput"
          class="modalInput"
          type="text"
          variant="success"
          placeholder="Enter your name"
          ref="focusThis"
          v-model="userName"
        />
        <label for="pwInput">Password</label>
        <input
          name="pwInput"
          class="modalInput"
          type="text"
          variant="success"
          placeholder="Enter the Password"
          ref="focusThis"
          v-model="userPassword"
        />
      </div>
      <template #modal-footer="{ ok }">
        <div class="signInActions">
          <b-button size="lg" variant="success" @click="registrationForm">
            Registration
          </b-button>
          <b-button size="lg" variant="primary" @click="submitFunc(ok)">
            Sign in
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SignIn",

  //Data from input
  data() {
    return {
      modalShow: true,
      userName: "",
      userPassword: "",
    };
  },
  methods: {
    ...mapActions(["logInUser", "register", "getUser"]),

    async submitFunc() {
      if (this.userName && this.userPassword) {
        this.logInUser({
          username: this.userName,
          password: this.userPassword,
        });
      }
      if (await this.getUser()) {
        this.$router.push({ path: "trello-page" });
      }
      //this.$router.push({ path: "trello-page" });
    },
    registrationForm() {
      this.register(true);
    },

    focusMyElement() {
      this.$refs.focusThis.focus();
    },
  },
};
</script>

<style lang="scss">
.signInForm,
.signInForm h3,
.signInForm h5 {
  width: 100%;
  text-align: center;
}
.signInForm h3 {
  color: rgb(0, 65, 38);
  font-weight: 700;
  display: block;
}
.modalInputBlock {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.modalInputBlock label {
  font-size: 22px;
}
.modalInputBlock .modalInput {
  border: 2px solid rgba(0, 0, 255, 0.5);
  border-radius: 5px;
  padding: 7.5px;
  margin: 0 0 10px 0;
}
.signInActions {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>