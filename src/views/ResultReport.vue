<template>
  <div class="report">
    <div class="user">
      <span class="user__info">Iм'я: {{ $cookies.get('userSurname') }}</span> <br>
      <span class="user__info">Фамiлiя: {{ $cookies.get('userName') }}</span> <br>
      <span class="user__info">Група: {{ $cookies.get('userGroup') }}</span>
    </div>
    <br>
    <div class="result">

    </div>
    <div class="statistic">
      {{ employees }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'ResultReport',
  mounted(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (!this.$store.state.isAuth) {
      this.$router.push({name: 'Registration'})
    }
  },
  computed: {
    ...mapState('employeeModule', {
      employees: (state: any) => state.employees
    })
  }
})
</script>

<style scope lang="scss">
@import '@/assets/resultReport.scss';
</style>