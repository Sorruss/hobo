<template>
  <el-collapse-item :title="setting.title" :name="id">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) in setting.variants" 
        border 
        :key="variant + id"
        :label="variant + (setting.additionalText ? setting.additionalText : '')"
        @click="setSetting(variant + id)"
        :ref="variant + id"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Setting } from '@/types/settingType'

export default defineComponent({
  name: 'collapse-item',
  inheritAttrs: false,
  props: {
    setting: {
      type: Object as () => Setting,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      resourse: ''
    }
  },
  methods: {
    setSetting(idx: string): void {
      const setting = {[this.setting.translation]: (this.$refs[idx] as any)[0].label}
      this.$emit('setSetting', setting)
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/collapseItem.scss';
</style>