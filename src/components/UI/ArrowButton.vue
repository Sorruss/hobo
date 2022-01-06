<template>
  <div @click="func" :class="direction === 'right' ? 'rightside noselect' : 'leftside noselect'">
    <img :src="direction === 'right' ? arrowBlackRight : arrowBlackLeft" alt="arrow">
    <span class="year-counter">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import arrowBlackRight from '@/static/images/arrowBlackRight.png'
import arrowBlackLeft from '@/static/images/arrowBlackLeft.png'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'arrow-button',
  data() {
    return {
      arrowBlackRight,
      arrowBlackLeft
    }
  },
  props: {
    func: {
      type: Function,
      required: true,
    },
    direction: {
      type: String,
      required: false,
      default: 'right'
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/arrowButton.scss';
</style>