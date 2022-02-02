<template>
  <div>
    <div class="title">
      <h2>{{username}}さんようこそ!!</h2>
      <p>
        {{wallet}}残高:
        <button @click="logout">ログアウト</button>
      </p>
    </div>
    <h1>ユーザー覧</h1>
    <div></div>
    <table>
      <tr>
        <th>ユーザー名</th>
      </tr>
      <tr v-for="(user,index) in userList" v-bind:key="index">
        <td>{{ user.username }}</td>
        <td>
          <button @click="openModal(user,index)">walletを見る</button>
        </td>
        <modal :val="usersIndex" v-show="showContent" @close="closeModal"></modal>
        <td>
          <button>送る</button>
        </td>
      </tr>
    </table>
  </div>
</template>
 
<script>
import firebase from "firebase";
import Modal from "../componets/Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      showContent: false,
      user: "",
      mywallet: "",
      userList: [],
      usersIndex: "",
    };
  },

  mounted() {
    const currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .where("uid", "!=", currentUser.uid)
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          this.userList.push(doc.data());
        });
      });
  },

  methods: {
    openModal(user) {
      this.showContent = true;
      this.usersIndex = user;
    },
    closeModal() {
      this.showContent = false;
    },

    logout() {
      this.$store.dispatch("logoutUser");
    },
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    wallet() {
      return this.$store.getters.wallet;
    },
  },
};
</script>
 
<style>
.title {
  width: 100%;
}
h2 {
  text-align: left;
  float: left;
  font-size: 18px;
  padding-left: 20%;
  margin: 0;
}
div.title p {
  font-size: 14px;
  text-align: right;
  padding: 0;
  margin: 0;
  padding-right: 20%;
}
</style>
