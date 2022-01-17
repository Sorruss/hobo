<template>
  <div class="choosePage noselect">
    <el-row>
      <el-col :span="6">
        <div class="info-container">
          <div class="info-block">
            <el-scrollbar wrap-style="max-height:100vh;">
              <img
                  :src="require('@/static/images/shot_' + parts[mapCounter].id + '.jpg')"
                  alt=""
                  class="info__region-image"
              >
              <el-collapse v-model="activeElements">
                <el-collapse-item title="Інформація про регіон">
                  <div class="info__text-block">
                    <h4 class="info__region-name info__region-header">{{parts[mapCounter].about.regionInfo.name}}</h4>
                    <p class="info__region-about info__paragraph">{{parts[mapCounter].about.regionInfo.description}}</p>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Робітники">
                  <div class="info__text-block">
                    <ul class="info__workers-list info__list">
                      <li
                          v-for="worker in parts[mapCounter].about.workers"
                          class="workers__list-element info__list-element"
                      >{{worker}}</li>
                    </ul>
                  </div>
                </el-collapse-item>
                <el-collapse-item title="Специфіка регіону">
                  <div class="info__text-block">
                    <p class="info__specs-text info__paragraph">У даному регіоні були виявлені такі постійні негативні чинники:</p>
                    <ul class="info__specs-list info__list">
                      <li
                          v-for="spec in parts[mapCounter].about.specifications"
                          class="specs__list-element info__list-element"
                      >{{spec}}</li>
                    </ul>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-scrollbar>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="map-container">
          <div class="map-block">
            <img :src="map_png" alt="map" class="map-img">
            <svg viewBox="0 0 708 478.66666" ref="mapContainer" :key="mapCounter">
              <path
                  class="part"
                  fill="black"
                  v-for="part in parts"
                  :d="part.coordinates"
                  :id="part.id"
                  :class="{active: part.isActive}"
                  @click="mapChooseRegion"
              />
            </svg>
          </div>
        </div>
<!--        <el-button @click="$store.dispatch('chooseLocationModule/mapStep',false)">back</el-button>-->
<!--        <el-button @click="$store.dispatch('chooseLocationModule/mapStep',true)">forward</el-button>-->
        <div class="map-controls__block">
          <div class="map-controls__wrap">
            <button class="map-controls__btn" @click="$store.dispatch('chooseLocationModule/mapStep',false)">&lt;</button>
            <button class="map-controls__btn" @click="$store.dispatch('chooseLocationModule/mapStep',true)">></button>
          </div>
        </div>
      </el-col>
    </el-row>



    <arrow-button @click="gameStart(parts[mapCounter].about.workers)" :func="toManag"></arrow-button>
    <arrow-button :func="toRegistration" direction="left"></arrow-button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import { mapActions, mapState } from 'vuex'

export default defineComponent({
  name: 'EmployeeChoose',
  computed: {
    ...mapState('chooseLocationModule', {
      map_png: (state: any) => state.map_png,
      parts: (state:any) => state.regions.parts,
      mapCounter: (state:any) => state.mapCounter
    })
  },
  mounted(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (!this.$store.state.isAuth) {
      this.$router.push({name: 'Registration'})
    } else if (this.$store.state.gameFinished) {
      this.$router.push({name: 'ResultReport'})
    }
  },
  methods: {
    ...mapActions('navigationModule', {
      toManag: 'toManag',
      toRegistration: 'toRegistration'
    }),

    mapChooseRegion(event:any): void{
      this.$store.commit("chooseLocationModule/mapChooseRegion",event.target.id)
    },

    gameStart(workers:Array<string>): void {
      this.$store.commit('setGameStarted', true)
      this.$store.commit('employeeModule/setWorkers',workers)
    }

  },
  data() {
    return{
      activeElements: ref(1)
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/employeeChoose.scss';
</style>