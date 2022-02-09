<template>
  <el-collapse-item title="Профілактика" class="accident" :name="accident.emplIndex - 6">
    <el-radio-group v-model="resourse" size="medium">
      <el-radio
        v-for="(variant, id) in accident.treatment"
        border
        :key="variant.translation + id"
        :label="variant.translation"
        @click="$store.commit('employeeModule/setAccidentTreatment', {emplIndex: accident.emplIndex, accidentTitle: accident.title, variant})"
      >
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Accident } from '@/types/accidentType'

export default defineComponent({
  name: 'collapse-item-accident',
  data() {
    return {
      resourse: ''
    }
  },
  props: {
    accident: {
      type: Object as () => Accident,
      required: true
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/collapseItem.scss';
.accident .el-collapse-item__header {
  background-color: orange;
}
</style>