<template>
  <div class="page">
    <div v-if="$route.fullPath.includes('game_step')" class="left">
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

    <div v-if="$route.fullPath.includes('game_step')" class="right">
      <img :src="images.arrowBlack" alt="arrow_right">
    </div>

    <custom-dialog v-model:show="repeatDialogVisible">
      <p>Ви впевнені, що хочете розпочати проходження заново?</p>
      <el-button type="danger">Так</el-button>
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

import arrowBlack from '@/static/images/arrowBlack.png'
import repeatImage from '@/static/images/repeat.png'
import referenceImage from '@/static/images/reference.png'

export default defineComponent({
  name: 'root',
  data() {
    return {
      images: {arrowBlack, repeatImage, referenceImage},
      repeatDialogVisible: false,
      drawerIsActive: false
    }
  },
  mounted() {
    this.$cookies.set('theme', 'default')
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f7f7f7;
  font-size: 20px;
}
body {
  background: #c1a6a6;
  margin: 0;
}

.page {
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  .container {
    width: 90%;
    background-color: #967878;
    padding: 0px 25px;
    margin-left: 5%;
    box-sizing: border-box;
  }
}

.mb0 {
  margin-bottom: 0 !important;
}
.mt0 {
  margin-top: 0 !important;
}
</style>