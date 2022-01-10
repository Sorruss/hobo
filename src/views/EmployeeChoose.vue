<template>
  <div class="choosePage noselect">
    <div class="map-container">
      <div class="map-block">
        <img :src="map_png" alt="map" class="map-img">
        <svg viewBox="0 0 708 478.66666" ref="mapContainer" :key="mapCounter">
          <path
            fill="black"
            v-for="part in parts"
            :d="part.coordinates"
            :id="part.id"
            :key="part.id"
            :class="{active: part.isActive, part: true}"
            @click="mapChooseRegion($event)"
          />
        </svg>
      </div>
    </div>
    <el-button @click="mapStep(false)">back</el-button>
    <el-button @click="mapStep(true)">forward</el-button>

    <div class="info-container">
      <div class="info-block">
        <h4 class="info__region-name">{{ parts[mapCounter].name }}</h4>
        <img src="" alt="region_image" class="info__region-image">
        <p class="info__region-about">{{ parts[mapCounter].description }}</p>
      </div>
    </div>

    <arrow-button @click="$store.commit('setGameStarted', true)" :func="toManag"></arrow-button>
    <arrow-button :func="toRegistration" direction="left"></arrow-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

import { regionPartType } from '@/types/regionPartType'

export default defineComponent({
  name: 'EmployeeChoose',
  computed: {
    ...mapState('chooseLocationModule', {
      map_png: (state: any) => state.map_png,
      parts: (state: any) => state.parts as Array<regionPartType>,
      mapCounter: (state: any) => state.mapCounter
    })
  },
  methods: {
    ...mapActions('navigationModule', {
      toManag: 'toManag',
      toRegistration: 'toRegistration'
    }),
    ...mapActions('chooseLocationModule', {
      mapCounterCorrect: 'mapCounterCorrect',
      mapStep: 'mapStep',
      mapChooseRegion: 'mapChooseRegion'
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
})
</script>

<style scoped lang="scss">
@import '@/assets/employeeChoose.scss';
</style>