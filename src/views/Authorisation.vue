<template>
  <div class="home">
    <div v-if="!this.registrationForm">
      <SignIn />
    </div>
    <div v-if="this.registrationForm">
      <Registration />
    </div>
  </div>
</template>

<script>
import SignIn from "../components/AuthPage/SignIn.vue";
import Registration from "../components/AuthPage/Registration.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Authorisation",
  data() {
    return {
      registration: false,
    };
  },
  methods: {
    ...mapActions(["getUser"]),
  },
  components: {
    SignIn,
    Registration,
  },
  computed: mapGetters(["logedIn", "registrationForm"]),
  async mounted() {
    if (await this.getUser()) {
      this.$router.push({ path: "trello-page" });
    }
  },
};
</script>


<style lang="scss">
</style>