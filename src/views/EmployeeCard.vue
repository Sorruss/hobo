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
        <collapse-item-accident
          v-show="isTreat()"
          :accident="accident"
        />

        <collapse-item-overdoze 
          v-show="employee.optionalSettings.length"
          v-for="overdoze in getOptionalSettings(employee)" 
          :key="overdoze.eId" 
          :overdoze="overdoze"
        />

        <collapse-item-disease 
          v-show="employee.diseases.length"
          v-for="disease in getDiseases(employee)" 
          :key="disease.eId" 
          :disease="disease"
        />

        <collapse-item 
          v-for="(setting, id) in getSettings(employee)" 
          :key="setting + id"
          :setting="setting"
          :employeePosition="employee.translation"
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
import allDiseases from '@/static/data/diseases'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'EmployeeCard',
  data() {
    return {
      activeSetting: ref(0),
      statePerc: 0,
      images: {
        smileImage: require('@/static/images/smileState.jpeg'),
        middleStateImage: require('@/static/images/middleState.png'),
        sadState1: require('@/static/images/sadState1.png'),
        sadState2: require('@/static/images/sadState2.png')
      },
      mounted: false
    }
  },
  computed: {
    ...mapState('employeeModule', {
      isAccident: (state:any) => state.isAccident,
      accident: (state:any) => state.currentAccident
    })
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
      for (const setting of Object.entries(employee.settings)) {
        if (setting[1]) {
          settings.push({translation: setting[0], ...allSettings[setting[0]]})
        }
      }
      return settings
    },
    getOptionalSettings(employee: any): Array<any> {
      if (!employee.optionalSettings.length) {
        return []
      }
      return employee.optionalSettings
    },
    isTreat(): boolean {
      return (this.isAccident && (this.employee.id === (this.accident.emplIndex + 1)))
    },
    getDiseases(employee: any): Array<any> {
      if (!employee.diseases.length) {
        return []
      }

      let treatmentWays
      const diseases = []
      for (const disease of employee.diseases) {
        treatmentWays = JSON.parse(JSON.stringify(allDiseases[disease].treatmentWays))
        for (const treatWay of Object.keys(treatmentWays)) {
          treatmentWays[treatWay].engName = treatWay
        }
        diseases.push({
          eId: employee.id, 
          translation: allDiseases[disease].translation, 
          engName: disease,
          treatmentWays
        })
      }
      return diseases
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