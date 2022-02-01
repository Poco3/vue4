import Vue from 'vue';
import Vuex from 'vuex';
import firebase from "firebase";
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        email: "",
        password: "",
        username: "",
        wallet: "",
        uid: "",
    },
    getters: {
        email: state => state.email,
        password: state => state.password,
        username: state => state.username,
        wallet: state => state.wallet,

    },
    mutations: {
        createName(state, username) {
            state.username = username
        },
        createEmail(state, email) {
            state.email = email
        },
        createPassword(state, password) {
            state.password = password

        },

        setUser(state, { nameDate, walletDate }) {
            state.username = nameDate
            state.wallet = walletDate
        },




    },
    actions: {
        createUser({ commit, state }) {
            firebase.auth().createUserWithEmailAndPassword(state.email, state.password)
                .then(() => {
                    const userData = firebase.auth().currentUser
                    userData.updateProfile({
                        displayName: state.username,
                    }).then(() => {
                        const db = firebase.firestore();
                        db.collection("users").doc(userData.uid).set({
                            uid: userData.uid,
                            email: userData.email,
                            username: userData.displayName,
                            wallet: 1000,

                        })
                            .then(() => {
                                const users = db.collection('users').doc(userData.uid);
                                users.get().then((doc) => {
                                    const nameDate = doc.data().username;
                                    const walletDate = doc.data().wallet;
                                    commit("setUser", { nameDate, walletDate });
                                }).catch((error) => {
                                    console.log("Error getting document:", error);
                                });
                            }).then(() => {
                                router.push('/home')
                            })

                    })




                })
                .catch((error) => {
                    console.log(error);
                })

        },
        loginUser({ commit }, { email, password }) {
            firebase
                .auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    const userData = firebase.auth().currentUser
                    commit('createName', userData.displayName)
                    const db = firebase.firestore()
                    const users = db.collection("users").doc(userData.uid);
                    users.get().then((doc) => {
                        const nameDate = doc.data().username;
                        const walletDate = doc.data().wallet;
                        commit('setUser', { nameDate, walletDate });
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                })
                .then(() => {
                    router.push('/home')
                })
                .catch((error) => {
                    console.log(error)
                    alert('エラー');
                })

        },
        logoutUser() {
            firebase.auth().signOut()
                .then(() => {
                    router.push('/');
                })
        }
    }

});