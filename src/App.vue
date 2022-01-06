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
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import repeatImage from '@/static/images/repeat.png'
import referenceImage from '@/static/images/reference.png'

export default defineComponent({
  name: 'root',
  data() {
    return {
      images: {repeatImage, referenceImage},
      repeatDialogVisible: false,
      drawerIsActive: false
    }
  },
  methods: {
    restart() {
      this.repeatDialogVisible = false
      this.drawerIsActive = false

      this.$store.commit('setIsAuth', false)
      this.$store.commit('setGameStarted', false)
      this.$store.commit('employeeModule/setYearCounter', 0)
      this.$store.dispatch('employeeModule/clearHistories')
      this.$store.dispatch('employeeModule/clearSettings')

      this.$router.push({name: 'Registration'})
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/app.scss';
</style>