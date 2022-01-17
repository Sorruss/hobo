<template>
  <div class="cards">
    <employee-card
      v-for="employee in employees"
      :employee="employee"
      :key="employee.id"
      :settings="settings"
      @setSetting="setSetting"
    />
  </div>
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
      setYearCounter: 'setYearCounter'
    }),
    ...mapActions('employeeModule', {
      nextYear: 'nextYear'
    }),
    keyDownListener(event: any): void {
      if (event.key === 'ArrowRight') {
        this.nextYear()
      }
    }
  },
  computed: {
    ...mapState('employeeModule', {
      employees: (state: any): Array<any> => state.employees,
      settings: (state: any) => state.settings,
      yearCounter: (state: any) => state.yearCounter
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