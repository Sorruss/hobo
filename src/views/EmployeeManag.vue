<template>
  <div class="cards">
    <employee-card
      v-for="(employee, id) in employees"
      :employee="employee"
      :key="id"
      @setSetting="setSetting"
    />
  </div>
  <custom-dialog :show="missingSettingAlertVidible" @hideDialog="setMissingSettingAlertVisible(false)">
    <p>{{ missingSettingAlertText }}</p>
    <el-button @click="setMissingSettingAlertVisible(false)" type="danger">Зрозуміло, дякую</el-button>
  </custom-dialog>

  <custom-dialog :show="overdozeAlertVisible" @hideDialog="setOverdozeAlertVisible(false)">
    <p>{{ overdozeReport }}</p>
    <el-button @click="setOverdozeAlertVisible(false)" type="danger">Зрозуміло, дякую</el-button>
  </custom-dialog>

  <custom-dialog :show="gameOver" :closeButton="false">
    <p>{{ gameOverReport }}</p>
    <el-button @click="setGameOver(false); pageReload()" type="danger">Розпочати заново</el-button>
  </custom-dialog>

  <custom-dialog :show="accidentAlert" :closeButton="false">
    <h2>Нещасний випадок</h2>
    <p>{{ String(currentAccident.text).replace("_",currentAccident.employee) }}</p>
    <p></p>
    <p>Ваш робітник пройшов лікування в міській лікарні і наразі потребує застосування профілактичних засобів для покращення загального стану роботи та підвищення ефективності своєї роботи. Протягом двох ігрових років вам буде доступний додатковий розділ "Профілактика". Поставтеся до цих засобів відповідально, бо від цього сильно залежить успіх вашої роботи</p>
    <el-button @click="setAccidentAlert(false);updateStateAccident(currentAccident.emplIndex,currentAccident.damage)" type="danger">OK</el-button>
  </custom-dialog>

  <arrow-button :func="nextYearWrap">
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
      setGameOver: 'setGameOver',
      setMissingSettingAlertVisible: 'setMissingSettingAlertVisible',
      setAccidentAlert: 'setAccidentAlert',
      updateStateAccident: 'updateStateAccident'
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
    },
    nextYearWrap(): void {
      this.nextYear();
    }
  },
  computed: {
    ...mapState('employeeModule', {
      employees: (state: any): Array<any> => state.employees,
      yearCounter: (state: any) => state.yearCounter,
      overdozeReport: (state: any) => state.overdozeReport,
      overdozeAlertVisible: (state: any) => state.overdozeAlertVisible,
      gameOver: (state: any) => state.gameOver,
      missingSettingAlertVidible: (state: any) => state.missingSettingAlertVidible,
      missingSettingAlertText: (state: any) => state.missingSettingAlertText,
      gameOverReport: (state: any) => state.gameOverReport,
      isAccident: (state:any) => state.isAccident,
      currentAccident: (state:any) => state.currentAccident,
      accidentAlert: (state:any) => state.accidentAlert,

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