<template>
  <el-collapse-item title="Профілактика" class="accident" :name="accident.emplIndex">
    <el-radio-group v-model="resourse" size="medium">
      <el-radio
        v-for="(variant, id) in accident.variants"
        border
        :key="variant + id"
        :label="variant"
        :ref="variant + id"
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