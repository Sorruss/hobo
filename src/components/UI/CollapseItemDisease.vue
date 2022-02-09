<template>
  <el-collapse-item :title="'Проф. хвороба:  ' + disease.translation" class="disease" :name="disease.eId - 11">
    <el-radio-group v-model="resourse" size="medium"> 
      <el-radio 
        v-for="(variant, id) of disease.treatmentWays" 
        border 
        :key="disease.translation + id"
        :label="disease.translation + id"
        @click="$store.dispatch('employeeModule/setDiseaseTreatment', {eId: disease.eId, diseaseTitle: disease.engName, variant, id: disease.translation + id})"
      >
        <span v-if="!notEnoughCoinsIdxs.includes(disease.translation + id)">
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
import { Disease } from '@/types/diseaseType'
import { mapState } from 'vuex'

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
  },
  computed: {
    ...mapState('employeeModule', {
      notEnoughCoinsIdxs: (state: any) => state.notEnoughCoinsIdxs,
      studentCoins: (state: any) => state.studentCoins
    })
  }
})
</script>

<style lang="scss">
@import '@/assets/UI/collapseItem.scss';
.disease .el-collapse-item__header {
  background-color: #f56c6c;
}
</style>