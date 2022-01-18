<template>
  <div class="cards">
    <employee-card
      v-for="(employee, id) in employees"
      :employee="employee"
      :key="id"
      @setSetting="setSetting"
    />
  </div>
  <custom-dialog :show="overdozeAlertVisible" @hideDialog="setOverdozeAlertVisible(false)">
    <p>{{ overdozeReport }}</p>
    <el-button @click="setOverdozeAlertVisible(false)" type="danger">Зрозуміло, дякую</el-button>
  </custom-dialog>

  <custom-dialog :show="gameOver" :closeButton="false">
    <p>game over mazafucka</p>
    <el-button @click="setGameOver(false); pageReload()" type="danger">Розпочати заново</el-button>
  </custom-dialog>

  <arrow-button :func="nextYear">
    {{ yearCounter }}
  </arrow-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapMutations, mapActions } from 'vuex'
import EmployeeCard from '@/views/EmployeeCard.vue'

export default defineComponent({
  name: 'EmployeeManagement',
  components: {EmployeeCard},
  methods: {
    ...mapMutations('employeeModule', {
      setSetting: 'setSetting',
      setOverdozeAlertVisible: 'setOverdozeAlertVisible',
      setGameOver: 'setGameOver'
    }),
    ...mapActions('employeeModule', {
      nextYear: 'nextYear'
    }),
    keyDownListener(event: any): void {
      if (event.key === 'ArrowRight') {
        this.nextYear()
      }
    },
    pageReload() {
      window.location.reload()
    }
  },
  computed: {
    ...mapState('employeeModule', {
      employees: (state: any): Array<any> => state.employees,
      yearCounter: (state: any) => state.yearCounter,
      overdozeReport: (state: any) => state.overdozeReport,
      overdozeAlertVisible: (state: any) => state.overdozeAlertVisible,
      gameOver: (state: any) => state.gameOver
    })
  },
  mounted(): void {
    if (!this.$store.state.isAuth) {
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

<style scope lang="scss">
@import '@/assets/employeeManag.scss';
</style>