<template>
  <el-collapse-item :title="'Проф. хвороба:  ' + disease.translation" class="disease" :name="disease.eId">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) of disease.treatmentWays" 
        border 
        :key="disease.translation + id"
        :label="variant.translation[0].toUpperCase() + variant.translation.slice(1)"
        :ref="disease.translation + id"
        @click="$store.commit('employeeModule/setDiseaseTreatment', {eId: disease.eId, diseaseTitle: disease.engName, variant: variant.engName})"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Disease } from '@/types/diseaseType'

export default defineComponent({
  name: 'collapse-item-disease',
  props: {
    disease: {
      type: Object as () => Disease,
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
.disease .el-collapse-item__header {
  background-color: #f56c6c;
}
</style>