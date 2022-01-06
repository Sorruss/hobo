<template>
  
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ResultReport',
  mounted() {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (!this.$store.state.isAuth) {
      this.$router.push({name: 'Registration'})
    }
  }
})
</script>

<style scope lang="scss">
@import '@/assets/resultReport.scss';
</style>