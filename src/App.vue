<template>
  <div class="page">
    <div v-if="$route.fullPath.includes('game_step')" class="left noselect">
      <div @click="repeatDialogVisible = true" class="repeat">
        <img :src="images.repeatImage" alt="repeat">
      </div>
      
      <div @click="drawerIsActive = true" class="reference">
        <img :src="images.referenceImage" alt="reference">
      </div>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>

    <custom-dialog v-model:show="repeatDialogVisible">
      <p>Ви впевнені, що хочете розпочати проходження заново?</p>
      <el-button @click="restart" type="danger">Так</el-button>
    </custom-dialog>

    <el-drawer 
      v-if="$route.fullPath.includes('game_step')"
      v-model="drawerIsActive" 
      title="Справка" 
      :with-header="true"
      direction="ltr"
      size="55%"
    >
      <span>Тут будет справка</span>
    </el-drawer>
    
    <div class="cookie-access" v-if="!cookieAccessPopUp">
      <div class="cookie-access__inner">
        Ви згодні з тим, що цей сайт буде використовувати файли cookie для зберігання даних на вашому комп’ютері?
      </div>
      <div class="cookie-access__buttons">
        <el-button plain @click="cookieAccessPopUp = true">Ні</el-button>
        <el-button plain @click="cookieAccess">Так</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      images: {
        repeatImage: require('@/static/images/repeat.png'), 
        referenceImage: require('@/static/images/reference.png')
      },
      repeatDialogVisible: false,
      drawerIsActive: false,
      cookieAccessPopUp: this.$cookies.get('cookieAccess')
    }
  },
  methods: {
    restart(): void {
      this.repeatDialogVisible = false
      this.drawerIsActive = false

      this.$store.commit('setIsAuth', false)
      this.$store.commit('setGameStarted', false)
      this.$store.commit('employeeModule/setYearCounter', 0)
      this.$store.dispatch('employeeModule/clearHistories')
      this.$store.dispatch('employeeModule/clearSettings')

      this.$router.push({name: 'Registration'})
    },
    cookieAccess(): void {
      this.$cookies.set('cookieAccess', true)
      this.cookieAccessPopUp = true
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/app.scss';
</style>