<template>
  <div class="card noselect">
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Status } from '@/types/statusType'

export default defineComponent({
  name: 'EmployeeCard',
  data() {
    return {
      activeSetting: ref(1),
      statePerc: 0,
      images: {
        smileImage: require('@/static/images/smileState.jpeg'),
        middleStateImage: require('@/static/images/smileState.jpeg'),
        sadState1: require('@/static/images/sadState1.png'),
        sadState2: require('@/static/images/sadState2.png')
      }
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
    setStatus(state: any): Status {
      state = this.employee.state[state]
      if (state <= 100 && state >= 70) {
        return 'success'
      } else if (state < 70 && state > 30) {
        return 'warning'
      } else {
        return 'exception'
      }
    },
    setImage(): string {
      let statePerc = 0
      for (let perc of Object.values(this.employee.state)) {
        statePerc += +<string>perc
      }
      statePerc = Math.floor(statePerc / Object.keys(this.employee.state).length)
      this.statePerc = statePerc
      
      if (statePerc <= 100 && statePerc >= 70) {
        return this.images.smileImage
      } else if (statePerc < 70 && statePerc >= 40) {
        return this.images.middleStateImage
      } else if (statePerc < 40 && statePerc >= 20) {
        return this.images.sadState1
      } else {
        return this.images.sadState2
      }
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/employeeCard.scss';
</style>