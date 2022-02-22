<template>
  <el-collapse-item :title="'Міри щодо ' + overdoze.dozeTrans" class="overdoze" :name="overdoze.eId - 16">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) in overdoze.variants" 
        border 
        :key="variant + id"
        :label="variant"
        @click="$store.commit('employeeModule/setODozeTreatment', {eId: overdoze.eId, overdozeTitle: overdoze.title, variant})"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
      resourse: ref('')
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