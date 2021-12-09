<template>
  <div>
    <div class="title">
      <h2>{{user}}さんようこそ!!</h2>
      <p>
        残高:1000
        <button @click="logout">ログアウト</button>
      </p>
    </div>
    <h1>ユーザー覧</h1>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user.displayName;
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("login");
      } else {
        window.location.href = "/";
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ path: "/" });
        });
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