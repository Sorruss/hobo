<template>
  <div @click="func" class="right">
    <img :src="arrowBlack" alt="arrow_right">
    <span class="right__year-counter">
      <slot></slot>
    </span>
  </div>
</template>

<script>
import arrowBlack from '@/static/images/arrowBlack.png'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'arrow-right-button',
  data() {
    return {
      arrowBlack
    }
  },
  props: {
    func: {
      type: Function,
      required: true,
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/arrowRightButton.scss';
</style>