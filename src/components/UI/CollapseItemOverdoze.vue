<template>
  <el-collapse-item :title="'Міри щодо ' + overdoze.title" class="overdoze">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) in overdoze.variants" 
        border 
        :key="variant + id"
        :label="variant"
        :ref="variant + id"
        @click="$store.commit('employeeModule/selectODozeTreatment', variant)"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Overdoze } from '@/types/overdozeType'

export default defineComponent({
  name: 'collapse-item-overdoze',
  props: {
    overdoze: {
      type: Object as () => Overdoze,
      required: true
    }
  },
  data() {
    return {
      resourse: ''
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/collapseItem.scss';
.overdoze .el-collapse-item__header {
  background-color: #f56c6c;
}
</style>