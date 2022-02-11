<template>
  <el-collapse-item title="Профілактика" class="accident" :name="accident.emplIndex - 6">
    <el-radio-group v-model="resourse" size="medium">
      <el-radio
        v-for="(variant, id) in accident.treatment"
        border
        :key="variant.translation + id"
        :label="variant.translation"
        @click="$store.dispatch('employeeModule/setAccidentTreatment', {emplIndex: accident.emplIndex, accidentTitle: accident.translation, variant, id: variant.translation + id})"
      >
        <span v-if="!notEnoughCoinsIdxs.includes(variant.translation + id)">
          <span style="color: gold;">
            {{ variant.price }}
          </span>
          {{ ': ' }}{{ variant.translation[0].toUpperCase() + variant.translation.slice(1) }}
        </span>
        <span style="color: #660000" v-else>
          Ціна: <span style="color: gold;">{{ variant.price }}</span> монет, ви маєте  
          <span style="color: gold;">
            {{ studentCoins }}
          </span>
        </span>
      </el-radio>
    </el-radio-group>
  </el-collapse-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Accident } from '@/types/accidentType'
import { mapState } from 'vuex'

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
  },
  computed: {
    ...mapState('employeeModule', {
      notEnoughCoinsIdxs: (state: any) => state.notEnoughCoinsIdxs,
      studentCoins: (state: any) => state.studentCoins
    })
  }
})
</script>

<style scope lang="scss">
@import '@/assets/UI/collapseItem.scss';
.accident .el-collapse-item__header {
  background-color: orange;
}
</style>