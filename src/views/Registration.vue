<template>
  <div class="startPage" @click="isInputting = false">
    <el-row>
      <el-col :span="2">
        <div class="inscription noselect">умовиㅤпрацi</div>
      </el-col>
      <el-col :span="22" v-if="mounted">
        <div class="registration">
          <el-form 
            ref="registrationForm"
            class="registration__form" 
            label-width="85px" 
            label-position="left"
            :rules="rules"
            :model="student"
            @click.stop
          >
            <el-form-item label="Фамiлiя" prop="surname">
              <el-input 
                v-model="student.surname" 
                type="text" 
                placeholder="Гейзенберг" 
                clearable
                maxlength="30"
                show-word-limit
                class="mt0"
                @click="isInputting = true"
              />
            </el-form-item>
            <el-form-item label="Iм'я" prop="name">
              <el-input 
                v-model="student.name" 
                type="text" 
                placeholder="Карл" 
                clearable 
                maxlength="30"
                show-word-limit
                @click="isInputting = true"
              />
            </el-form-item>
            <el-form-item label="Група" prop="group">
              <el-input 
                v-model="student.group" 
                type="text" 
                placeholder="ПЗПI-21-6" 
                clearable
                maxlength="20"
                show-word-limit
                @click="isInputting = true"
              />
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <div v-else>
        <el-skeleton animated :throttle="500" style="
          height: 100vh;
          width: 75vw;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;"
        >
          <template #template>
            <div style="width: 45%; display: flex; justify-content: space-around; align-items: center; margin-bottom: 20px;">
              <el-skeleton-item variant="p" style="width: 20%; height: 6vh;"/>
              <el-skeleton-item variant="p" style="width: 75%; height: 7vh;"/>
            </div>
            <div style="width: 45%; display: flex; justify-content: space-around; align-items: center; margin-bottom: 20px;">
              <el-skeleton-item variant="p" style="width: 20%; height: 6vh;"/>
              <el-skeleton-item variant="p" style="width: 75%; height: 7vh;"/>
            </div>
            <div style="width: 45%; display: flex; justify-content: space-around; align-items: center;">
              <el-skeleton-item variant="p" style="width: 20%; height: 6vh;"/>
              <el-skeleton-item variant="p" style="width: 75%; height: 7vh;"/>
            </div>
          </template>
        </el-skeleton>
      </div>
    </el-row>
  </div>
  <arrow-button :func="submitRegistration"></arrow-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCookies } from 'vue3-cookies'
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'Registration',
  data() {
    const { cookies } = useCookies()
    return {
      student: {
        surname: cookies.get('userSurname'),
        name: cookies.get('userName'),
        group: cookies.get('userGroup')
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Будь ласка, ведіть Вашу фамілію',
            trigger: 'blur'
          }
        ],
        surname: [
          {
            required: true,
            message: 'Будь ласка, ведіть Ваше ім\'я',
            trigger: 'blur'
          }
        ],
        group: [
          {
            required: true,
            message: 'Будь ласка, ведіть Вашу групу',
            trigger: 'blur'
          }
        ]
      },
      mounted: false,
      isInputting: false
    }
  },
  mounted(): void {
    if (this.$store.state.gameStarted && !this.$route.fullPath.includes('game_step')) {
      this.$router.push({name: 'GameStart'})
    } else if (this.$store.state.gameFinished) {
      this.$router.push({name: 'ResultReport'})
    }

    window.addEventListener('keydown', this.keyDownListener)
    this.mounted = true
  },
  unmounted(): void {
    window.removeEventListener('keydown', this.keyDownListener)
  },
  methods: {
    keyDownListener(event: any): void {
      if (event.key === 'ArrowRight' && !this.isInputting) {
        this.submitRegistration()
      }
    },
    submitRegistration(): void | false {
      try {
        (this.$refs['registrationForm'] as typeof ElForm).validate((valid: any) => {
          if (valid) {
            if (this.$cookies.get('cookieAccess')) {
              this.$cookies.set('userName', this.student.name.trim())
              this.$cookies.set('userSurname', this.student.surname.trim())
              this.$cookies.set('userGroup', this.student.group.trim())
            }

            this.$store.commit('setIsAuth', true)
            this.$store.commit('setStudent', {
              name: this.student.name.trim(), 
              surname: this.student.surname.trim(), 
              group: this.student.group.trim()
            })
            this.$router.push({name: 'EmployeeChoose'})
          } else {
            return false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
</script>

<style lang="scss" scope>
@import '@/assets/registration.scss';
</style>