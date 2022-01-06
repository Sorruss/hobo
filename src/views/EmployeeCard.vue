<template>
  <div class="card">
    <div class="card__position">
      {{ employee.position }} ({{ statePerc }}%)
    </div>
    <div class="card__photo">
      <img :src="setImage()" alt="employee_image">
    </div>
    <div class="card__stats">
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.hp"
        :status="setStatus('hp')"
      >
        <span>Здоровье</span>
      </el-progress>
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.vision"
        :status="setStatus('vision')"
      >
        <span>Зрение</span>
      </el-progress>
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.hearing"
        :status="setStatus('hearing')"
      >
        <span>Слух</span>
      </el-progress>
    </div>
    <div class="card__settings">
      <el-collapse v-model="activeSetting">
        <collapse-item 
          v-for="(setting, id) in settings" 
          :key="setting + id"
          :setting="setting"
          @setSetting="$emit('setSetting', [employee.id, $event])"
        />
      </el-collapse>
    </div>
    <div class="card__additional_settings">

    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import smileImage from '@/static/images/smile.jpeg'

export default defineComponent({
  name: 'EmployeeCard',
  data() {
    return {
      activeSetting: ref(1),
      statePerc: 0
    }
  },
  props: {
    employee: {
      type: Object,
      required: true
    },
    settings: {
      type: Object,
      required: true
    }
  },
  methods: {
    setStatus(state) {
      state = this.employee.state[state]
      if (state <= 100 && state >= 70) {
        return 'success'
      } else if (state < 70 && state > 30) {
        return 'warning'
      } else {
        return 'exception'
      }
    },
    setImage() {
      let statePerc = 0
      for (let perc of Object.values(this.employee.state)) {
        statePerc += +perc
      }
      statePerc = Math.floor(statePerc / Object.keys(this.employee.state).length)
      this.statePerc = statePerc
      if (statePerc <= 100 && statePerc >= 70) {
        return smileImage
      } else if (statePerc < 70 && statePerc > 30) {
        return smileImage
      } else {
        return smileImage
      }
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/employeeCard.scss';
</style>