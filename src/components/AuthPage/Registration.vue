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
          <h3>Registrate a new user</h3>
          <h5>Please fill all fields</h5>
        </div>
      </template>

      <div class="modalInputBlock">
        <label for="nameInput">Name</label>
        <input
          name="nameInput"
          class="modalInput"
          type="text"
          variant="success"
          placeholder="Enter your name"
          ref="focusThis"
          v-model="userName"
        />
        <label for="emailInput">Email</label>
        <input
          name="emailInput"
          class="modalInput"
          type="text"
          variant="success"
          placeholder="Enter the Email"
          ref="focusThis"
          v-model="userEmail"
        />
        <label for="pwInput">Password</label>
        <input
          name="pwInput"
          class="modalInput"
          type="password"
          variant="success"
          placeholder="Enter the Password"
          ref="focusThis"
          v-model="userPassword"
        />
      </div>
      <template v-if="registered">
        <h4>
          Hello {{ this.userName }}, plese check your Email: "{{
            this.userEmail
          }}" to confirm registration.
        </h4>
      </template>
      <template #modal-footer>
        <div class="signInActions">
          <b-button size="lg" variant="warning" @click="registrationForm">
            Back to LogIn
          </b-button>
          <b-button size="lg" variant="primary" @click="submitFunc">
            Register
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Registration",

  //Data from input
  data() {
    return {
      modalShow: true,
      userName: "",
      userEmail: "",
      userPassword: "",
      registered: "",
    };
  },
  methods: {
    ...mapActions(["registerUser", "register"]),
    submitFunc() {
      if (this.userName && this.userPassword && this.userEmail) {
        this.registerUser({
          username: this.userName,
          password: this.userPassword,
          attributes: {
            email: this.userEmail,
          },
        });
        this.registered = true;
      }
    },

    registrationForm() {
      this.register(false);
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
</style>