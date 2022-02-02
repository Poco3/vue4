<template>
  <transition name="modal" appear>
    <div id="overlay" @click="$emit('close')">
      <div class="window">
        <div id="content">
          <p>{{val.username}} さんの残高</p>
          <p>{{val.wallet}}</p>
          <footer class="modal-footer">
            <button @click="$emit('close')">close</button>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    val: {
      type: null,
    },
  },

  closeModal() {
    this.$emit("close", this.showContent);
  },
};
</script>

<style>
#content {
  z-index: 10;
  width: 30%;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  top: 82%;
  left: 35%;
}
#content p {
  margin: 10px 0;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-footer {
  background: rgba(204, 204, 204, 0.877);
  padding: 10px;
  text-align: right;
}
.modal-footer button {
  margin: 0;
  color: white;
  background-color: red;
  border: 2px solid red;
  padding: 3px 15px;
  border-radius: 2px;
  transition: 0.4s;
  outline: 0px;
}
</style>