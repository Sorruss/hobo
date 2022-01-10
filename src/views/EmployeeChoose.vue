<template>
  <div class="choosePage noselect">
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
              @click="mapChooseRegion($event)"
          />
        </svg>
      </div>
    </div>
    <el-button @click="mapStep(false)">back</el-button>
    <el-button @click="mapStep(true)">forward</el-button>
    <div class="info-container">
      <div class="info-block">
        <h4 class="info__region-name">{{parts[mapCounter].name}}</h4>
        <img src="" alt="" class="info__region-image">
        <p class="info__region-about">{{parts[mapCounter].description}}</p>
      </div>
    </div>
    <arrow-button @click="$store.commit('setGameStarted', true)" :func="toManag"></arrow-button>
    <arrow-button :func="toRegistration" direction="left"></arrow-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

import regions from "@/static/data/mapData.json"

export default defineComponent({
  name: 'EmployeeChoose',
  computed: {
    ...mapState('chooseLocationModule', {
      map_png: (state: any) => state.map_png
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

    mapCounterCorrect(): void{
      if(this.mapCounter < 0){
        this.mapCounter = this.parts.length-1;
      } else if(this.mapCounter>=this.parts.length){
        this.mapCounter = 0;
      }
    },

    mapStep(dir:boolean): void{
      regions.parts[this.mapCounter].isActive = false;

      if(dir)
        this.mapCounter++;
      else
        this.mapCounter--;

      this.mapCounterCorrect()
      regions.parts[this.mapCounter].isActive = true;
    },

    mapChooseRegion(event:any): void{
      regions.parts[this.mapCounter].isActive = false;
      this.mapCounter = event.target.id;
      regions.parts[this.mapCounter].isActive = true;
    }
  },
  data() {
    return{
      parts: regions.parts,
      mapCounter: 0,
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/employeeChoose.scss';
</style>