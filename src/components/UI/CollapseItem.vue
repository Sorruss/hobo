<template>
  <el-collapse-item :title="setting.title" :name="setting.id">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) in setting.variants" 
        border 
        :key="variant + id"
        :label="variant"
        @click="test(variant + id)"
        :ref="variant + id"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'collapse-item',
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      resourse: ''
    }
  },
  methods: {
    test(idx) {
      const setting = {[this.setting.translation]: this.$refs[idx][0].label}
      this.$emit('setSetting', setting)
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/collapseItem.scss';
</style>