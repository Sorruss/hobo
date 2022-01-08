<template>
  <div v-if="show" @click.stop="hide" class="modal">
    <div @click.stop class="modal-content">
      <span class="close" @click="hide">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
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
    hide(): void {
      this.$emit('update:show', false)
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/customDialog.scss';
</style>