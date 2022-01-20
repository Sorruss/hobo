<template>
  <div class="report">
    <div class="user">
      <span class="user__info"><b>Звіт з лабораторної роботи "Работяга"</b></span>
      <span class="user__info">Виконав: {{ student.surname + ' ' +  student.name}}</span>
      <span class="user__info">Група {{ student.group }}, ХНУРЕ, Харків</span>
    </div>
    <div class="points">
      <div class="point">
        <div class="point__title">1. Мета роботи</div>
        <div class="point__body">
          Дослідження впливу різних факторів навколишнього середовища, умов праці та відновлювальних 
          заходів на здоров'я людини у процесі її трудової діяльності.
        </div>
      </div>

      <div class="point">
        <div class="point__title">2. Вихідні дані</div>
        <div class="point__body">
          <div>Регіон: {{ student.region }}</div>
          <div>Підприємство: {{ student.company }}</div>
          <div>Професії: {{ employees.map(x => x.translation).join(', ') }}</div>
        </div>
      </div>

      <div class="point">
        <div class="point__title">3. Завдання</div>
        <div class="point__body">
          Під час проходження програми необхідно стежити, щоб на обраному підприємстві усі працівники 
          були здорові, працювали ефективно та за 15 кроків здобули не менше 120 очок кожен. З метою 
          запобігання появі професійних захворювань у працівників необхідно правильно вибирати 
          професійні навантаження та відновлювальні заходи.
        </div>
      </div>
      
      <div class="point">
        <div class="point__title">4. Хід роботи</div>
        <div class="point__body">
          <div>Початок роботи: {{ student.gameStartTime }}</div><br>
          <div>
            В результаті виконання лабораторної роботи отримано графіки, що відображають 
            зміну здоров'я за ключовими показниками кожного з працівників. Графіки представлені 
            на графіки 1-4.
          </div>
        </div>
      </div>
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
  created(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (!this.$store.state.isAuth) {
      this.$router.push({name: 'Registration'})
    }
  },
  computed: {
    ...mapState('employeeModule', {
      employees: (state: any) => state.employees
    }),
    ...mapState({
      student: (state: any) => state.student
    })
  }
})
</script>

<style scope lang="scss">
@import '@/assets/resultReport.scss';
</style>