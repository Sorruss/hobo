<template>
  <div v-if="show" @click.stop="hide" class="modal">
    <div @click.stop class="modal-content">
      <span class="close" @click="hide">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'custom-dialog',
  props: {
    show: {
      type: Boolean, 
      required: false,
      default: false
    }
  },
  methods: {
    hide() {
      this.$emit('update:show', false)
    }
  },
  created() {
    window.addEventListener('keydown', (event) => {
      console.log(event.key)
      if (event.key == 'Escape') {
        this.hide()
      }
    })
  }
})
</script>

<style scope lang="scss">
.modal {
  transition: all 2s ease-in-out;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  top: 0;
  left: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  &-content {
    background-color: #C1A6A7;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #967879;
    width: 50%; /* Could be more or less, depending on screen size */
  }
}

/* The Close Button */
.close {
  transition: all 0.1s ease-in-out;
  color: #282323;
  float: right;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  &:hover, &:focus {
    transform: scale(1.05);
    color: black;
  }
}
</style>