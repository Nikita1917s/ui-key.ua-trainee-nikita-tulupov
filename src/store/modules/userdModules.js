import { Auth } from "aws-amplify";

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
                console.log(`User registration is failed ${err} ${context}`)
            }
        },
        async logOutUser() {
            try {
                await Auth.signOut();
            } catch (err) {
                console.log(`User registration is failed ${err}`)
            }
        },
        async getUser(context) {
            const session = await Auth.currentSession();
            const user = await Auth.currentAuthenticatedUser();

            context.commit('setUserName', user.username);
            context.commit('setLoggin', session.accessToken.jwtToken);
            return session.accessToken.jwtToken

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
        logedIn: '',
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