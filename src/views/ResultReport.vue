<template>
  <div class="report" v-if="student">
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
          були здорові, працювали ефективно та за 15 кроків здобули не менше 110 балiв кожен. З метою 
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
            зміну здоров'я за ключовими показниками кожного з працівників. Історії змін показників 
            представлені на графіках 1-4.
          </div>
        </div>
      </div>

      <div class="charts">
        <div class="chart" v-for="employee in getEmployees()" :key="employee.id">
          <div class="chart__header">{{ employee.translation }}</div>
          <div class="chart__vue3">
            <Chart
              :size="{width: 500, height: 420}"
              :data="employee.history"
              :margin="margin"
              direction="horizontal"
              :axis="axis"
            >

              <template #layers>
                <Grid strokeDasharray="2,2"/>

                <Line :dataKeys="['year', 'hp']" type="monotone" :lineStyle="{stroke: 'blue'}"/>
                <Line :dataKeys="['year', 'vision']" type="monotone" :lineStyle="{stroke: 'red'}"/>
                <Line :dataKeys="['year', 'hearing']" type="monotone" :lineStyle="{stroke: 'brown'}"/>

                <Marker v-if="true" :value="40" label="мiнiмум" color="red" :strokeWidth="2" strokeDasharray="12 12"/>
                <Marker v-if="true" :value="80" label="норма" color="lightgreen" :strokeWidth="2" strokeDasharray="12 12"/>
              </template>

              <template #widgets>
                <Tooltip
                  borderColor="#48CAE4"
                  :config="{
                    year: {label: 'рiк', color: 'black', hide: false},
                    hp: {label: 'здоров\'я', color: 'blue'},
                    vision: {label: 'зiр', color: 'red'},
                    hearing: {label: 'слух', color: 'brown'}
                  }"
                />
              </template>
            </Chart>
          </div>
          <div class="chart__title">
            Графiк {{ employee.id }}. Зміна стану здоров'я за фахом {{ employee.translation }}
          </div>
        </div>
        <div class="charts__results">
          <div class="results__text">
            У таблиці 1 представлені стани працівників підприємства та їх ефективності праці 
            (в балах), досягнуті після закінчення проходження програми.
          </div>
          <div class="results__table">
            <el-table 
              :data="getTableData()" 
              border 
              stripe
            >
              <el-table-column prop="employeePosition" label="Професія" width="180"/>
              <el-table-column prop="score" label="Бали" width="180"/>
              <el-table-column prop="state" label="Стан"/>
            </el-table>
            <div class="table__title">
              <small>Таблиця 1. Ефективність праці працівників підприємства</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapState } from 'vuex'
import { Chart, Grid, Line, Tooltip, Marker } from 'vue3-charts'

export default defineComponent({
  name: 'ResultReport',
  components: {Chart, Grid, Line, Tooltip, Marker},
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
  },
  methods: {
    getEmployees(): Array<any> {
      return this.employees
    },
    getTableData() {
      const tableData = []
      let empScore = null
      let totalScore = 0
      for (const employee of this.employees) {
        empScore = (Math.floor((employee.state.hp + employee.state.hearing + employee.state.vision) * 0.43))
        totalScore += empScore
        tableData.push({
          employeePosition: employee.translation,
          score: empScore.toString(),
          state: 'Пояснично-крестцовый радикулит (XXX ст.)',
        })
      }
      tableData.push({
        employeePosition: 'Сума за професіями',
        score: totalScore,
        state: ''
      },
      {
        employeePosition: 'Норма підприємства',
        score: '450 – 500',
        state: ''
      })
      return tableData
    }
  },
  setup() {
    const margin = ref({top: 20, right: 20})
    const axis = ref({
      secondary: {
        domain: ['dataMin', 'dataMax + 100'],
        type: 'linear',
        ticks: 8
      }
    })
    return {margin, axis}
  }
})
</script>

<style scope lang="scss">
@import '@/assets/resultReport.scss';
</style>