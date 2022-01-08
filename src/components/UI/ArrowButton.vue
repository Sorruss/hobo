<template>
  <div @click="func" :class="direction === 'right' ? 'rightside noselect' : 'leftside noselect'">
    <img :src="direction === 'right' ? arrowBlackRight : arrowBlackLeft" alt="arrow">
    <span class="year-counter">
      <slot></slot>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type direction = 'right' | 'left'

export default defineComponent({
  name: 'arrow-button',
  data() {
    return {
      arrowBlackRight: require('@/static/images/arrowBlackRight.png'),
      arrowBlackLeft: require('@/static/images/arrowBlackLeft.png')
    }
  },
  props: {
    func: {
      type: Function,
      required: true,
    },
    direction: {
      type: String as () => direction,
      required: false,
      default: 'right'
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/arrowButton.scss';
</style>