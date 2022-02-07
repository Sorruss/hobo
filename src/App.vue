<template>
  <div class="page">
    <vue-progress-bar></vue-progress-bar>

    <div v-if="$route.fullPath.includes('game_step')" class="left noselect">
      <div @click="repeatDialogVisible = true" class="repeat" :class="!isEmergency ? 'extended' : ''">
        <img :src="images.repeatImage" alt="repeat">
      </div>
      
      <div v-if="isEmergency" class="coins_counter">
        {{ studentCoins }} <img class="coin" src="@/static/images/coin.png" alt="coin"> 
      </div>

      <div @click="drawerIsActive = true" class="reference" :class="!isEmergency ? 'extended' : ''">
        <img :src="images.referenceImage" alt="reference">
      </div>
    </div>

    <div class="container">
      <router-view></router-view>
    </div>

    <custom-dialog :show="repeatDialogVisible" @hideDialog="repeatDialogVisible = false">
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
      <el-scrollbar wrap-style="height: 89vh;">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="Інформація про роботу" name="1">
            <div class="text-block">
              <h3>1.1 Мета роботи</h3>
              <p>
                Дослідження впливу різних факторів навколишнього середовища, умов праці й відновних 
                заходів на здоров'я людини в процесі її трудової діяльності.
              </p>
            </div>
            <div class="text-block">
              <h3>1.2 Фактори, що розглядаються</h3>
              <p>
                У лабораторній роботі на основі комп'ютерної моделюючої програми «Роботяга» 
                досліджується вплив на здоров'я людини наступних факторів:
              </p>
              <ul>
                <li>Ккологічне середовище; </li>
                <li>Специфіка підприємства;</li>
                <li>Професійні навантаження; </li>
                <li>Відновлювальні заходи; </li>
                <li>Виробничі й побутові травми.</li>
              </ul>
            </div>
            <div class="text-block">
              <h3>1.3 Завдання гри</h3>
              <p>
                Лабораторна робота на основі програми «Работяга» знайомить із ризиками та шкідливими 
                факторами на виробництві, нормативними даними щодо організації робочого місця. 
                Програма у наочній формі показує вплив екології регіонів України на здоров'я людини, 
                дає уявлення про причини поширених професійних захворювань та пропонує засоби їх 
                профілактики. До програми включені заходи щодо лікування та реабілітації після різних 
                виробничих та побутових травм.
              </p>
              <p>
                Для виконання лабораторної роботи необхідно опрацювати 15 років (кожний хід дорівнює 
                одному році) в особі, відповідальної за охорону праці на обраному підприємстві. 
                Протягом цього часу треба прагнути підтримувати добрий стан здоров'я всіх працівників 
                підприємства та своєчасно призначати спеціальні заходи реабілітації від травм, що 
                виникають після надзвичайних ситуацій.
              </p>
              <p>
                Здоров'я працівників визначається вибором професійних навантажень, умов праці та 
                відновлювальних заходів, що залежать від типу підприємства, регіону та роду професії. 
                Вибрані параметри можуть призводити як до поліпшення стану здоров'я працівників, так 
                і його погіршення.При значній втраті здоров'я працівник підприємства втрачає 
                кваліфікацію, що призводить до неможливості подальшого продовження програми. У цьому 
                випадку необхідно повторити проходження з огляду на всі попередні недоліки на вибір 
                параметрів.
              </p>
              <p>
                При роботі з програмою двічі у випадково вибрані моменти часу з працівниками 
                відбуваються деякі надзвичайні ситуації (хвороби, травми), що тягнуть за собою 
                погіршення здоров'я по одній із систем організму. У цьому випадку необхідно у 
                найкоротший час знайти ефективні засоби лікування серед нових запропонованих 
                оздоровчих заходів та спеціального харчування.
              </p>
            </div>
            <div class="text-block">
              <h3>1.4 Зміст звіту</h3>
              <p>
                Звіт містить деякі дані, накопичені в процесі виконання роботи. Крім того, у 
                шаблоні звіту передбачені місця для самостійного заповнення – професійні 
                навантаження й оптимальні умови праці для кожного працівника, найбільш ефективні 
                місця відпочинку й засобів реабілітації від наслідків надзвичайних ситуацій. 
              </p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Опис інтерфейсу" name="2">
            <div class="text-block">
              <p>
                Інтерфейс програми "Работяга" складається з двох основних частин - головний екран 
                та кнопки для управління процесом гри. Компоненти управління - це кнопки зліва та зправа. 
                Зліва розташовані дві кнопки, це кнопка "Почати спочатку" &nbsp;
                <span class="text-block__img">
                  <img :src="require('@/static/images/repeat.png')" alt="repeat image">
                </span>&nbsp; та кнопка "Інформація"&nbsp; 

                <span class="text-block__img">
                  <img :src="require('@/static/images/reference.png')" alt="reference image">
                </span>&nbsp;. 
                Кнопки відповідно використовуються, щоб почати гру спочатку, та отримати інформацію 
                щодо користування програмою "Работяга". У правій частині екрану можна побачити одну 
                кнопку з стрілкою, що відповідає за проходження одного ігрового року для працівників 
                вашого виробництва. Знизу, під стрілкою, розташований лічильник, який відображає 
                кількість пройдених ігрових років.
              </p>
              <p>
                Посередині розташовані саме робітники вашого виробництва. Зверху розташовані назви 
                посад на вашому виробництві та відсоток стану ваших робітників відповідно. Нижче є 
                смайлик, який відображає дійсний стан вашого робітника. Під смайликом можна побачити 
                три стрічки, які заповнюються в залежності від стану даного робітника в даному році. 
                Це стрічки "Здоров'я", "Зір" та "Слух". Вони можуть бути зафарбовані в три кольори - 
                зелений, жовтий та червоний; в залежності від відсотку даного показника. Нижче можна 
                побачити численні налаштування для кожного з робітників. Для того, щоб почати гру, 
                треба вибрати для чотироьох робітників усі їх налаштування. Якщо налаштування не 
                поміщаються на вашому екрані, то можна скролити даний екран донизу.
              </p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Теоретичний матеріал" name="3">
            <div class="text-block">
              <h3>Відомості про параметри робіт</h3>
              <h4>3.1 Калорійність харчування</h4>
              <p>
                Щоб правильно визначити норми для працівників підприємства, необхідно насамперед 
                визначити вид їхньої роботи. Залежно від загальних енерговитрат роботи поділяються 
                на такі категорії:
              </p>
              <ul>
                <li>
                  <strong>Легкі фізичні роботи (категорія Ia та Iб)</strong>
                   - роботи, які виконуються сидячи, стоячи або пов'язані з ходьбою, але не 
                   потребують систематичної фізичної напруги або підняття та перенесення тяжкості. 
                   Енерговитрати для робіт категорії Ia - до 120 ккал/год; роботи категорії Iб - 
                   від 121 до 150 ккал/год.
                </li>
                <li>
                  <strong>Фізичні роботи середньої тяжкості (категорія IIa та IIб)</strong>
                  . до категорії робіт IIа відносяться роботи, пов'язані з постійною ходьбою, які 
                  виконуються стоячи або сидячи, але не потребують перенесення важких речей. До 
                  категорії IIб відносяться роботи, пов'язані з ходьбої та перенесенням невеликих 
                  (до 10 кг) ваг. Енерговитрати становлять від 200 до 250 ккал/год.
                </li>
                <li>
                  <strong>Тяжкі фізичні роботи (категорія III)</strong>
                   — це роботи, пов'язані із систематичною фізичною напругою, зокрема, з постійними 
                   пересуваннями та перенесенням значних (понад 10 кг) тяжкостей з енерговитратами 
                   понад 250 ккал/год.
                </li>
              </ul>
            </div>
            <div class="text-block">
              <h4>3.2 Параметри мікроклімату</h4>
              <br>
              <table class="info-temp">
                <tr>
                  <td>Період року</td>
                  <td>Кат. робіт</td>
                  <td>Температура повітря</td>
                </tr>
                <tr>
                  <td>Теплий</td>
                  <td>
                    <p>
                      Ia<br/>
                      Iб<br/>
                      IIa<br/>
                      IIб<br/>
                      III
                    </p>
                  </td>
                  <td>
                    <p>
                      23-25<br/>
                      22-24<br/>
                      21-23<br/>
                      20-22<br/>
                      18-19
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>Холодний</td>
                  <td>
                    <p>
                      Ia<br/>
                      Iб<br/>
                      IIa<br/>
                      IIб<br/>
                      III
                    </p>
                  </td>
                  <td>
                    <p>
                      22-24<br/>
                      21-23<br/>
                      18-20<br/>
                      17-19<br/>
                      16-18
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Controllability" name="4">
            <div>
              Прийняття рішень: давати поради щодо операцій допустимо, 
              але не приймати рішення за користувачів;
            </div>
            <div>
              Контрольовані наслідки: користувачам слід надати свободу роботи, включаючи 
              скасування, переривання або припинення поточної роботи.
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-scrollbar>
    </el-drawer>
    
    <div class="cookie-access" v-if="!cookieAccessPopUp">
      <div class="cookie-access__inner">
        Ви згодні з тим, що цей сайт буде використовувати файли cookie для зберігання даних на 
        вашому комп’ютері?
      </div>
      <div class="cookie-access__buttons">
        <el-button plain @click="cookieAccessPopUp = true">Ні</el-button>
        <el-button plain @click="cookieAccess">Так</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'App',
  data() {
    return {
      images: {
        repeatImage: require('@/static/images/repeat.png'), 
        referenceImage: require('@/static/images/reference.png')
      },
      repeatDialogVisible: false,
      drawerIsActive: false,
      cookieAccessPopUp: this.$cookies.get('cookieAccess'),
      activeNames: ref(['1'])
    }
  },
  methods: {
    restart(): void {
      this.repeatDialogVisible = false
      this.drawerIsActive = false

      this.$store.commit('setIsAuth', false)
      this.$store.commit('setGameStarted', false)
      this.$store.commit('employeeModule/setYearCounter', 0)
      this.$store.commit('employeeModule/setStudentCoins', 0)
      this.$store.commit('employeeModule/setIsEmergency', false)
      this.$store.dispatch('employeeModule/clearHistories')
      this.$store.dispatch('employeeModule/clearSettings')

      this.$router.push({name: 'Registration'})
    },
    cookieAccess(): void {
      this.$cookies.set('cookieAccess', true)
      this.cookieAccessPopUp = true
    }
  },
  created() {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  computed: {
    ...mapState('employeeModule', {
      isEmergency: (state: any) => state.isEmergency,
      studentCoins: (state: any) => state.studentCoins
    })
  },
  mounted() {
    this.$Progress.finish()
  }
})
</script>

<style lang="scss">
@import '@/assets/app.scss';
</style>