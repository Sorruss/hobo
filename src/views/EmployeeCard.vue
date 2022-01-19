<template>
  <div class="card noselect" v-if="mounted">
    <div class="card__position">
      {{ employee.translation }} ({{ statePerc }}%)
    </div>
    <div class="card__photo">
      <img :src="setImage()" alt="employee_image">
    </div>
    <div class="card__stats">
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.hp >= 0 ? employee.state.hp : 0"
        :status="setStatus('hp')"
      >
        <span>Здоров'я</span>
      </el-progress>
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.hearing >= 0 ? employee.state.hearing : 0"
        :status="setStatus('hearing')"
      >
        <span>Слух</span>
      </el-progress>
      <el-progress
        :text-inside="true"
        :stroke-width="22"
        :percentage="employee.state.vision >= 0 ? employee.state.vision : 0"
        :status="setStatus('vision')"
      >
        <span>Зір</span>
      </el-progress>
    </div>
    <div class="card__settings">
      <el-collapse v-model="activeSetting">
        <collapse-item-overdoze 
          v-show="employee.optionalSettings"
          v-for="overdoze in getOptionalSettings(employee)" 
          :key="overdoze.eId"
          :overdoze="overdoze"
        />

        <collapse-item 
          v-for="(setting, id) in getSettings(employee)" 
          :key="setting + id"
          :setting="setting"
          :id="id"
          @setSetting="$emit('setSetting', [employee.id, $event])"
        />
      </el-collapse>
    </div>
  </div>
  <div v-else>
    <el-skeleton :throttle="400" animated style="width: 20vw; display: flex; flex-direction: column; align-items: center; margin-top: 10px;">
      <template #template>
        <el-skeleton-item variant="p" style="width: 75%; margin-bottom: 5px;" />
        
        <el-skeleton-item variant="image" style="width: 100%; height: 240px; margin-bottom: 5px;" />
        
        <el-skeleton-item variant="rect" style="width: 100%; margin-bottom: 5px;" />
        <el-skeleton-item variant="rect" style="width: 100%; margin-bottom: 5px;" />
        <el-skeleton-item variant="rect" style="width: 100%; margin-bottom: 5px;" />

        <el-skeleton-item 
          v-for="(setting, id) in getSettings(employee)" 
          :key="setting + id"
          variant="rect"
          style="width: 100%; height: 20vh; margin-bottom: 5px;"
        />
      </template>
    </el-skeleton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Status } from '@/types/statusType'
import allSettings from '@/static/data/settings'

export default defineComponent({
  name: 'EmployeeCard',
  data() {
    return {
      activeSetting: ref(Array(this.getSettings(this.employee).length).fill(0).map((x, id) => x + id)),
      statePerc: 0,
      images: {
        smileImage: require('@/static/images/smileState.jpeg'),
        middleStateImage: require('@/static/images/smileState.jpeg'),
        sadState1: require('@/static/images/sadState1.png'),
        sadState2: require('@/static/images/sadState2.png')
      },
      mounted: false
    }
  },
  props: {
    employee: {
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
    },
    getSettings(employee: any): Array<any> {
      const settings = []
      for (let setting of Object.entries(employee.settings)) {
        if (setting[1]) {
          // @ts-ignore
          settings.push({translation: setting[0], ...allSettings[setting[0]]})
        }
      }
      return settings
    },
    getOptionalSettings(employee: any): Array<any> {
      return employee.optionalSettings
    }
  },
  mounted() {
    this.mounted = true
  }
})
</script>

<style scope lang="scss">
@import '@/assets/employeeCard.scss';
</style>