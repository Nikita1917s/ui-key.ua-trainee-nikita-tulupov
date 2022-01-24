import { Auth } from "aws-amplify";
//import jwt_decode from "jwt-decode";

export default {
    actions: {
        async registerUser(context, payload) {
            try {
                const signUpResponse = await Auth.signUp(payload);
                return signUpResponse
            } catch (err) {
                console.log(`User registration is failed ${err} ${context}`)
            }
        },

        async logInUser(context, payload) {
            try {
                const user = await Auth.signIn(payload.username, payload.password);
                return user
            } catch (err) {
                console.log(`User signIn is failed ${err} ${context}`)
            }
        },

        async logOutUser(context) {
            try {
                await Auth.signOut();
                context.commit('setUserName', '');
                context.commit('setLoggin', false);
            } catch (err) {
                console.log(`User can't logOut try again ${err}`)
            }
        },

        async getUser(context) {

            try {
                await Auth.currentAuthenticatedUser();
                const user = await Auth.currentAuthenticatedUser();
                context.commit('setLoggin', true);
                context.commit('setUserName', user.username);
                return true;
            } catch {
                console.log('Please SignIn')
                return false;
            }
        },

        async register(context, result) {
            context.commit('setRegistration', result);
        }
    },

    mutations: {
        setLoggin(state, value) {
            state.logedIn = value;
        },
        setUserName(state, value) {
            state.userName = value;
        },
        setRegistration(state, value) {
            state.registrationVal = value;
        },
    },

    state: {
        logedIn: false,
        userName: '',
        registrationVal: ''
    },

    getters: {
        logedIn(state) {
            return state.logedIn;
        },
        userName(state) {
            return state.userName;
        },
        registrationForm(state) {
            return state.registrationVal;
        },
    }
};