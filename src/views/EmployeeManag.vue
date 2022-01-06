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
  <arrow-right-button :func="nextYear">
    {{ yearCounter }}
  </arrow-right-button>
</template>

<script>
import { defineComponent } from 'vue'
import EmployeeCard from '@/views/EmployeeCard.vue'
import { mapState, mapMutations, mapActions } from 'vuex'

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
    })
  },
  computed: {
    ...mapState('employeeModule', {
      employees: state => state.employees,
      settings: state => state.settings,
      yearCounter: state => state.yearCounter
    })
  }
})
</script>

<style scope lang="scss">
@import '@/assets/employeeManag.scss';
</style>