<template>
  <div class="choosePage noselect">
    <el-row>
      <el-col :span="6" class="info">
        <div class="info-container">
          <div class="info-block">
            <el-scrollbar wrap-style="height: 100vh;">
              <img
                :src="require(`@/static/images/${parts[mapCounter].imgName}`)"
                alt="location_photo"
                class="info__region-image"
              >
              <el-collapse v-model="activeElements">
                <el-collapse-item title="Інформація про регіон">
                  <div class="info__text-block">
                    <h4 class="info__region-name info__region-header">{{ parts[mapCounter].about.regionInfo.name }}</h4>
                    <p class="info__region-about info__paragraph">{{ parts[mapCounter].about.regionInfo.description }}</p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Робітники" :name="1">
                  <div class="info__text-block">
                    <ul class="info__workers-list info__list">
                      <li
                        v-for="worker in parts[mapCounter].about.workers"
                        class="workers__list-element info__list-element"
                        :key="worker"
                      >
                        {{ employees[worker].translation }}
                      </li>
                    </ul>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Специфіка регіону" :name="2">
                  <div class="info__text-block">
                    <p class="info__specs-text info__paragraph">У даному регіоні були виявлені такі постійні негативні чинники:</p>
                    <ul class="info__specs-list info__list">
                      <li
                        v-for="spec in parts[mapCounter].about.specifications"
                        class="specs__list-element info__list-element"
                        :key="spec"
                      >
                        {{ spec }}
                      </li>
                    </ul>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="map">
        <div class="map-container">
          <div class="map-block">
            <img :src="map_png" alt="map" class="map-img">
            <svg viewBox="0 0 708 478.66666" ref="mapContainer">
              <path
                fill="black"
                v-for="part in parts"
                :d="part.coordinates"
                :id="part.id"
                :key="part.id"
                :class="{active: part.isActive, part: true}"
                @click="mapChooseRegion(part.id)"
              />
            </svg>
          </div>
        </div>
        <div class="map-controls__block">
          <div class="map-controls__wrap">
            <button class="map-controls__btn" @click="mapStep(false)">
              <img src="@/static/images/arrowBlackLeft.png" alt="arrowBack">
            </button>
            <button class="map-controls__btn" @click="mapStep(true)">
              <img src="@/static/images/arrowBlackRight.png" alt="arrowNext">
            </button>
          </div>
        </div>
      </el-col>
    </el-row>

    <arrow-button 
      @click="$store.commit('setGameStarted', true); 
        $store.dispatch('employeeModule/setEmployees', parts[mapCounter].about.workers)" 
      :func="toManag"
    ></arrow-button>
    <arrow-button :func="toRegistration" direction="left"></arrow-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapActions, mapState } from 'vuex'

import { regionPartType } from '@/types/regionPartType'

export default defineComponent({
  name: 'EmployeeChoose',
  data() {
    return {
      activeElements: ref([1, 2])
    }
  },
  computed: {
    ...mapState('chooseLocationModule', {
      map_png: (state: any) => state.map_png,
      parts: (state: any) => state.parts as Array<regionPartType>,
      mapCounter: (state: any) => state.mapCounter,
      employees: (state: any) => state.employees
    })
  },
  methods: {
    ...mapActions('navigationModule', {
      toManag: 'toManag',
      toRegistration: 'toRegistration'
    }),
    ...mapActions('chooseLocationModule', {
      mapStep: 'mapStep',
      mapChooseRegion: 'mapChooseRegion'
    }),
    keyDownListener(event: any): void {
      if (event.key === 'ArrowRight') {
        this.$store.dispatch('employeeModule/setEmployees', this.parts[this.mapCounter].about.workers)
        this.toManag()
      } else if (event.key === 'ArrowLeft') {
        this.toRegistration()
      }
    }
  },
  mounted(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (!this.$store.state.isAuth) {
      this.$router.push({name: 'Registration'})
    } else if (this.$store.state.gameFinished) {
      this.$router.push({name: 'ResultReport'})
    }
  
    window.addEventListener('keydown', this.keyDownListener)
  },
  unmounted(): void {
    window.removeEventListener('keydown', this.keyDownListener)
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/employeeChoose.scss';
</style>